import * as awilix from "awilix";
import {
  SignInUseCase,
  SignUpUseCase,
  SignOutUseCase,
  VerifyAccountUseCase,
  UpdateUserUseCase,
  UpdateProfileImageUseCase,
  ForgotPasswordRequestUseCase,
  ResetPasswordUseCase,
  GoogleSignInUseCase,
  GoogleSignUpUseCase
} from '@application/use-cases';
import {
  SignInControllerFactory,
  SignOutControllerFactory,
  GetUserControllerFactory,
  SignUpControllerFactory,
  UpdateUserControllerFactory,
  VerifyAccountControllerFactory,
  UpdateProfileImageControllerFactory,
  ForgotPasswordRequestControllerFactory,
  ResetPasswordControllerFactory,
  GoogleSignInControllerFactory,
  GoogleSignUpControllerFactory
} from '@adapters/REST-controllers';
import {
  UserRepository,
  VerificationTokenRepository,
  ProfileImageRepository,
  ForgotPasswordTokenRepository
} from '@adapters/repositories';
import {
  AuthEmails,
  AuthEventQueue
} from '@adapters/services';
import {
  JWTTokenService,
  IdGenerator,
  BCryptEncryptionService,
  SendgridEmailService,
  SQSService,
  putFileInReq,
  S3Service
} from '@language-app/common-platform';
import { Dependencies } from '@main';

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    // controllers
    [Dependencies.LOGINCONTROLLER]: awilix.asFunction(SignInControllerFactory),
    [Dependencies.LOGOUTCONTROLLER]: awilix.asFunction(SignOutControllerFactory),
    [Dependencies.SIGNUPCONTROLLER]: awilix.asFunction(SignUpControllerFactory),
    [Dependencies.GETUSERCONTROLLER]: awilix.asFunction(GetUserControllerFactory),
    [Dependencies.UPDATEUSERCONTROLLER]: awilix.asFunction(UpdateUserControllerFactory),
    [Dependencies.VERIFYACCOUNTCONTROLLER]: awilix.asFunction(VerifyAccountControllerFactory),
    [Dependencies.UPDATEPROFILEIMAGECONTROLLER]: awilix.asFunction(UpdateProfileImageControllerFactory),
    [Dependencies.FORGOTPASSWORDREQUESTCONTROLLER]: awilix.asFunction(ForgotPasswordRequestControllerFactory),
    [Dependencies.RESETPASSWORDCONTROLLER]: awilix.asFunction(ResetPasswordControllerFactory),
    "googleSignUpController": awilix.asFunction(GoogleSignUpControllerFactory),
    "googleSignInController": awilix.asFunction(GoogleSignInControllerFactory),


    // middleware
    [Dependencies.FILEMIDDLEWARE]: awilix.asValue(putFileInReq),

    // services
    [Dependencies.ENCRYPTIONSERVICE]: awilix.asClass(BCryptEncryptionService),
    [Dependencies.IDSERVICE]: awilix.asClass(IdGenerator),
    [Dependencies.TOKENSERVICE]: awilix.asClass(JWTTokenService),
    [Dependencies.AUTHEMAILSERVICE]: awilix.asClass(AuthEmails).classic(),
    [Dependencies.AUTHEVENTQUEUE]: awilix.asClass(AuthEventQueue).classic(),

    [Dependencies.STORAGESERVICE]: awilix.asClass(S3Service),
    [Dependencies.EMAILSERVICE]: awilix.asClass(SendgridEmailService),
    [Dependencies.QUEUESERVICE]: awilix.asClass(SQSService),

    // use cases
    [Dependencies.LOGOUTUSECASE]: awilix.asClass(SignOutUseCase).classic(),
    [Dependencies.LOGINUSECASE]: awilix.asClass(SignInUseCase).classic(),
    [Dependencies.SIGNUPUSECASE]: awilix.asClass(SignUpUseCase).classic(),
    [Dependencies.VERIFYACCOUNTUSECASE]: awilix.asClass(VerifyAccountUseCase).classic(),
    [Dependencies.UPDATEUSERUSECASE]: awilix.asClass(UpdateUserUseCase).classic(),
    [Dependencies.UPDATEPROFILEIMAGEUSECASE]: awilix.asClass(UpdateProfileImageUseCase).classic(),
    [Dependencies.RESETPASSWORDUSECASE]: awilix.asClass(ResetPasswordUseCase).classic(),
    [Dependencies.FORGOTPASSWORDREQUESTUSECASE]: awilix.asClass(ForgotPasswordRequestUseCase).classic(),
    "googleSignInUseCase": awilix.asClass(GoogleSignInUseCase).classic(),
    "googleSignUpUseCase": awilix.asClass(GoogleSignUpUseCase).classic(),

    // repositories
    [Dependencies.USERREPOSITORY]: awilix.asClass(UserRepository),
    [Dependencies.VERIFICATIONTOKENREPOSITORY]: awilix.asClass(VerificationTokenRepository),
    [Dependencies.PROFILEIMAGEREPOSITORY]: awilix.asClass(ProfileImageRepository).classic(),
    [Dependencies.FORGOTPASSWORDTOKENREPOSITORY]: awilix.asClass(ForgotPasswordTokenRepository)
  })
}
