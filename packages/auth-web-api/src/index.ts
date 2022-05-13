import 'reflect-metadata';
require('dotenv-safe').config({
  allowEmptyValues: true,
  path: `.env.${process.env.NODE_ENV}`,
});
import { ExpressServer } from './frameworks/http-server/app';
import {
  SignUpUseCaseFactory,
  LoginUseCaseFactory,
  GetUserUseCaseFactory,
} from '@application/use-cases';
import { UserRepository } from '@adapters/repositories';

import {
  SignUpControllerFactory,
  LoginControllerFactory,
  GetUserControllerFactory,
  ErrorHandlerControllerFactory,
} from '@adapters/REST-controllers';
import { AuthenticationMiddlewareControllerFactory } from '@adapters/REST-middleware';
import { ExpressControllerAdapter } from '@frameworks/http';
import {
  BCryptEncryptionService,
  JWTTokenService,
  IdGenerator,
} from '@frameworks/services';

(async () => {
  try {
    // const database = new TypeORMDatabase({
    //   dbConnectionName: process.env.NODE_ENV,
    // });
    // await database.connect();

    // services and repositories
    const userRepository = new UserRepository();
    const encryptionService = new BCryptEncryptionService();
    const tokenService = new JWTTokenService();
    const idService = new IdGenerator();

    // use cases
    const signUpUseCase = SignUpUseCaseFactory({
      userRepository,
      encryptionService,
      tokenService,
      idService,
    });
    const loginUseCase = LoginUseCaseFactory({
      userRepository,
      encryptionService,
      tokenService,
    });
    const getUserUseCase = GetUserUseCaseFactory({
      tokenService,
      userRepository,
    });

    // controllers
    const signUpController = SignUpControllerFactory({
      signUpUseCase,
    });
    const loginController = LoginControllerFactory({
      loginUseCase,
    });
    const getUserController = GetUserControllerFactory({
      getUserUseCase,
    });

    const authMiddleware = AuthenticationMiddlewareControllerFactory({
      tokenService,
    });
    const errorHandler = ErrorHandlerControllerFactory();

    // http server
    const expressAdapter = new ExpressControllerAdapter();
    const server = new ExpressServer({
      // db: database,
      logger: { info: console.log, error: console.error },
      controllers: [signUpController, loginController, getUserController].map(
        (controller) => ({
          middleware: controller.middleware,
          method: controller.method,
          controller: expressAdapter.adaptControllerFunction(
            controller.controller
          ),
          path: controller.path,
        })
      ),
      middlewares: {
        auth: expressAdapter.adaptMiddlewareControllerFunction(
          authMiddleware.controller
        ),
      },
      errorHandlers: [
        {
          controller: expressAdapter.adaptErrorControllerFunction(
            errorHandler.controller
          ),
        },
      ],
    });

    await server.start();
  } catch (e) {
    console.error('Server instanciating failed', e);
  }
})();
