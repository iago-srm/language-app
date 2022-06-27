import * as awilix from 'awilix';
import {
  SignInUseCase,
  SignUpUseCase,
  SignOutUseCase,
  VerifyAccountUseCase,
  UpdateUserUseCase,
  UpdateProfileImageUseCase
} from '@application/use-cases';
import {
  SignInControllerFactory,
  SignOutControllerFactory,
  GetUserControllerFactory,
  SignUpControllerFactory,
  UpdateUserControllerFactory,
  VerifyAccountControllerFactory,
  UpdateProfileImageControllerFactory,
  ErrorHandlerControllerFactory
} from '@adapters/REST-controllers';
import {
  AuthenticationMiddlewareControllerFactory
} from '@adapters/REST-middleware';
import {
  UserRepository,
  VerificationTokenRepository,
  ProfileImageRepository
} from '@adapters/repositories';
import {
  JWTTokenService,
  IdGenerator,
  BCryptEncryptionService,
  SendgridEmailService,
  putFileInReq,
  S3Service
} from '@frameworks/services';
import {
  ExpressControllerAdapter,
  ExpressServer as FrameworkServer,
} from '@frameworks/http';

const container = awilix.createContainer();

export enum Dependencies {
  // controllers
  LOGINCONTROLLER = 'signInController',
  SIGNUPCONTROLLER = 'signupController',
  GETUSERCONTROLLER = 'getUserController',
  LOGOUTCONTROLLER = 'signOutController',
  UPDATEUSERCONTROLLER = 'updateUserController',
  VERIFYACCOUNTCONTROLLER = 'verifyAccountController',
  UPDATEPROFILEIMAGECONTROLLER = 'updateProfileImageController',

  AUTHMIDDLEWARE = 'authMiddleware',
  ERRORHANDLER = 'errorHandler',

  // services
  TOKENSERVICE = 'tokenService',
  IDSERVICE = 'idService',
  ENCRYPTIONSERVICE = 'encryptionService',
  EMAILSERVICE = 'emailService',
  LOGGER = 'logger',
  FILEMIDDLEWARE = 'fileMiddleware',
  STORAGESERVICE = 'storageService',

  // use cases
  LOGOUTUSECASE = 'signOutUseCase',
  LOGINUSECASE = 'signInUseCase',
  SIGNUPUSECASE = 'signUpUseCase',
  GETUSERUSECASE = 'getUserUseCase',
  VERIFYACCOUNTUSECASE = 'verifyAccountUseCase',
  UPDATEUSERUSECASE = 'updateUserUseCase',
  UPDATEPROFILEIMAGEUSECASE = 'updateProfileImageUseCase',

  // repositories
  USERREPOSITORY = 'userRepository',
  VERIFICATIONTOKENREPOSITORY = 'verificationTokenRepository',
  PROFILEIMAGEREPOSITORY = 'profileImageRepository',

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
  [Dependencies.VERIFYACCOUNTCONTROLLER]: awilix.asFunction(VerifyAccountControllerFactory),
  [Dependencies.UPDATEPROFILEIMAGECONTROLLER]: awilix.asFunction(UpdateProfileImageControllerFactory),

  [Dependencies.AUTHMIDDLEWARE]: awilix.asFunction(AuthenticationMiddlewareControllerFactory),
  [Dependencies.ERRORHANDLER]: awilix.asFunction(ErrorHandlerControllerFactory),

  // services
  [Dependencies.ENCRYPTIONSERVICE]: awilix.asClass(BCryptEncryptionService),
  [Dependencies.IDSERVICE]: awilix.asClass(IdGenerator),
  [Dependencies.TOKENSERVICE]: awilix.asClass(JWTTokenService),
  [Dependencies.EMAILSERVICE]: awilix.asClass(SendgridEmailService),
  [Dependencies.FILEMIDDLEWARE]: awilix.asValue(putFileInReq),
  [Dependencies.STORAGESERVICE]: awilix.asClass(S3Service),

  // use cases
  [Dependencies.LOGOUTUSECASE]: awilix.asClass(SignOutUseCase).classic(),
  [Dependencies.LOGINUSECASE]: awilix.asClass(SignInUseCase).classic(),
  [Dependencies.SIGNUPUSECASE]: awilix.asClass(SignUpUseCase).classic(),
  [Dependencies.VERIFYACCOUNTUSECASE]: awilix.asClass(VerifyAccountUseCase).classic(),
  [Dependencies.UPDATEUSERUSECASE]: awilix.asClass(UpdateUserUseCase).classic(),
  [Dependencies.UPDATEPROFILEIMAGEUSECASE]: awilix.asClass(UpdateProfileImageUseCase).classic(),

  // repositories
  [Dependencies.USERREPOSITORY]: awilix.asClass(UserRepository),
  [Dependencies.VERIFICATIONTOKENREPOSITORY]: awilix.asClass(VerificationTokenRepository),
  [Dependencies.PROFILEIMAGEREPOSITORY]: awilix.asClass(ProfileImageRepository).classic(),
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
        middlewares,
        path
      }) => {
        return({
        middlewares,
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
        file: container.resolve(Dependencies.FILEMIDDLEWARE)
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
