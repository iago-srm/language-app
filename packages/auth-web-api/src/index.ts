import "reflect-metadata";
require("dotenv-safe").config({
  allowEmptyValues: true,
  path: `.env.${process.env.NODE_ENV}`
});
import { ExpressServer } from "./frameworks/http-server/app";
import {
  SignUpUseCaseFactory,
  LoginUseCaseFactory,
} from '@application/use-cases';
import {
  UserRepository,
} from '@adapters/repositories';
import {
  // TypeORMDatabase,
  // InMemoryDatabase
} from '@frameworks/databases';
import {
  SignUpControllerFactory,
  LoginControllerFactory,
  ErrorHandlerControllerFactory
} from '@adapters/REST-controllers';
import {
  AuthenticationMiddlewareControllerFactory
} from '@adapters/REST-middleware';
import { ExpressControllerAdapter } from '@frameworks/http';
import { BCryptEncryptionService, JWTTokenService } from '@frameworks/services';

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

    // use cases
    const signUpUseCase = SignUpUseCaseFactory({
      userRepository,
      encryptionService
    });
    const loginUseCase = LoginUseCaseFactory({
      userRepository,
      encryptionService,
      tokenService
    });

    // controllers
    const signUpController = SignUpControllerFactory({
      signUpUseCase
    });
    const loginController = LoginControllerFactory({
      loginUseCase
    });
    const authMiddleware = AuthenticationMiddlewareControllerFactory({
      tokenService
    });
    const errorHandler = ErrorHandlerControllerFactory();

    // http server
    const expressAdapter = new ExpressControllerAdapter();
    const server = new ExpressServer({
      // db: database,
      logger: { info: console.log, error: console.error },
      controllers: [
        signUpController,
        loginController,
      ].map(controller => ({
        middleware: controller.middleware,
        method: controller.method,
        controller: expressAdapter.adaptControllerFunction(controller.controller),
        path: controller.path
      })),
      middlewares: {
        auth: expressAdapter.adaptMiddlewareControllerFunction(authMiddleware.controller)
      },
      errorHandlers: [
        {controller: expressAdapter.adaptErrorControllerFunction(errorHandler.controller)}
      ]
    })

    await server.start();

  } catch(e) {
    console.error("Server instanciating failed",e);
  }
})();
