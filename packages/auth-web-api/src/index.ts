import * as awilix from 'awilix';
import {
  ExpressServer as FrameworkServer,
} from '@frameworks/http';
import {
  SignInControllerFactory,
  SignOutControllerFactory,
  GetUserControllerFactory,
  SignUpControllerFactory,
  UpdateUserControllerFactory,
  ErrorHandlerControllerFactory
} from '@adapters/REST-controllers';
import {
  UserRepository
} from '@adapters/repositories';
import {
  JWTTokenService,
  IdGenerator,
  BCryptEncryptionService,
  SendgridEmailService
} from '@frameworks/services';
import {
  SignInUseCase,
  SignUpUseCase,
  SignOutUseCase,
  ValidateAccountUseCase
} from '@application/use-cases';
import { AuthenticationMiddlewareControllerFactory } from '@adapters/REST-middleware';
import { ExpressControllerAdapter } from '@frameworks/http';

const container = awilix.createContainer();

export enum Dependencies {
  // controllers
  LOGINCONTROLLER = 'signInController',
  SIGNUPCONTROLLER = 'signupController',
  GETUSERCONTROLLER = 'getUserController',
  LOGOUTCONTROLLER = 'signOutController',
  UPDATEUSERCONTROLLER = 'updateUserController',

  AUTHMIDDLEWARE = 'authMiddleware',
  ERRORHANDLER = 'errorHandler',

  // services
  TOKENSERVICE = 'tokenService',
  IDSERVICE = 'idService',
  ENCRYPTIONSERVICE = 'encryptionService',
  EMAILSERVICE = 'emailService',
  LOGGER = 'logger',

  // use cases
  LOGOUTUSECASE = 'signOutUseCase',
  LOGINUSECASE = 'signInUseCase',
  SIGNUPUSECASE = 'signUpUseCase',
  GETUSERUSECASE = 'getUserUseCase',
  VALIDATEACCOUNTUSECASE = 'validateAccountUseCase',

  // repositories
  USERREPOSITORY = 'userRepository',

  // server
  SERVER = 'server',
}

container.register({
  // controllers
  [Dependencies.LOGINCONTROLLER]: awilix.asFunction(SignInControllerFactory),
  [Dependencies.LOGOUTCONTROLLER]: awilix.asFunction(SignOutControllerFactory),
  [Dependencies.SIGNUPCONTROLLER]: awilix.asFunction(SignUpControllerFactory),
  [Dependencies.GETUSERCONTROLLER]: awilix.asFunction(GetUserControllerFactory),
  [Dependencies.UPDATEUSERCONTROLLER]: awilix.asFunction(UpdateUserControllerFactory),

  [Dependencies.AUTHMIDDLEWARE]: awilix.asFunction(AuthenticationMiddlewareControllerFactory),
  [Dependencies.ERRORHANDLER]: awilix.asFunction(ErrorHandlerControllerFactory),

  // services
  [Dependencies.ENCRYPTIONSERVICE]: awilix.asClass(BCryptEncryptionService),
  [Dependencies.IDSERVICE]: awilix.asClass(IdGenerator),
  [Dependencies.TOKENSERVICE]: awilix.asClass(JWTTokenService),
  [Dependencies.EMAILSERVICE]: awilix.asClass(SendgridEmailService),

  // use cases
  [Dependencies.LOGOUTUSECASE]: awilix.asClass(SignOutUseCase).classic(),
  [Dependencies.LOGINUSECASE]: awilix.asClass(SignInUseCase).classic(),
  [Dependencies.SIGNUPUSECASE]: awilix.asClass(SignUpUseCase).classic(),
  [Dependencies.VALIDATEACCOUNTUSECASE]: awilix.asClass(ValidateAccountUseCase).classic(),

  // repositories
  [Dependencies.USERREPOSITORY]: awilix.asClass(UserRepository),
})

// console.log('sgup res',container.resolve(Dependencies.SIGNUPCONTROLLER).controller.toString())

const expressAdapter = new ExpressControllerAdapter();
const getControllers = (container: awilix.AwilixContainer) => {
  const controllers = []
  for (let registrationName in container.registrations) {
    if(registrationName.includes("Controller")) {
      controllers.push(container.resolve(registrationName));
    }
  }
  return controllers;
}

// console.log(container.resolve(Dependencies.ERRORHANDLER).controller.toString())
container.register({
  // server
  [Dependencies.SERVER]:
  awilix.asClass(FrameworkServer)
  .singleton()
  .inject((container: awilix.AwilixContainer) => {
    return {
      controllers: getControllers(container).map(({
        controller,
        method,
        middleware,
        path
      }) => {
        return({
        middleware,
        method,
        controller: expressAdapter.adaptControllerFunction(
          controller
        ),
        path,
      })}),
      logger: { info: console.log, error: console.error },
      middlewares: {
        auth: expressAdapter.adaptMiddlewareControllerFunction(
          container.resolve(Dependencies.AUTHMIDDLEWARE).controller
        ),
      },
      errorHandler: {
        controller: expressAdapter.adaptErrorControllerFunction(
          container.resolve(Dependencies.ERRORHANDLER).controller
        ),
      },
    }
  })
});

const server = container.resolve(Dependencies.SERVER);

(async () => {
  try {
    await server.start()
  } catch(e) {
    console.error('Server instanciation failed', e);
  }
})()
