export enum Dependencies {
  // controllers
  LOGINCONTROLLER = 'signInController',
  SIGNUPCONTROLLER = 'signupController',
  GETUSERCONTROLLER = 'getUserController',
  LOGOUTCONTROLLER = 'signOutController',
  UPDATEUSERCONTROLLER = 'updateUserController',
  VERIFYACCOUNTCONTROLLER = 'verifyAccountController',
  UPDATEPROFILEIMAGECONTROLLER = 'updateProfileImageController',
  FORGOTPASSWORDREQUESTCONTROLLER = 'forgotPasswordRequestController',
  RESETPASSWORDCONTROLLER = 'resetPasswordController',

  // middleware
  FILEMIDDLEWARE = 'fileMiddleware',

  // services
  TOKENSERVICE = 'tokenService',
  IDSERVICE = 'idService',
  ENCRYPTIONSERVICE = 'encryptionService',
  LOGGER = 'logger',
  AUTHEMAILSERVICE = 'authEmailService',
  AUTHEVENTQUEUE = 'authEventQueue',

  STORAGESERVICE = 'storageService',
  EMAILSERVICE = 'emailService',
  QUEUESERVICE = 'queueService',

  // use cases
  LOGOUTUSECASE = 'signOutUseCase',
  LOGINUSECASE = 'signInUseCase',
  SIGNUPUSECASE = 'signUpUseCase',
  GETUSERUSECASE = 'getUserUseCase',
  VERIFYACCOUNTUSECASE = 'verifyAccountUseCase',
  UPDATEUSERUSECASE = 'updateUserUseCase',
  UPDATEPROFILEIMAGEUSECASE = 'updateProfileImageUseCase',
  FORGOTPASSWORDREQUESTUSECASE = 'forgotPasswordRequestUseCase',
  RESETPASSWORDUSECASE = 'resetPasswordUseCase',

  // repositories
  USERREPOSITORY = 'userRepository',
  VERIFICATIONTOKENREPOSITORY = 'verificationTokenRepository',
  PROFILEIMAGEREPOSITORY = 'profileImageRepository',
  FORGOTPASSWORDTOKENREPOSITORY = 'forgotPasswordTokenRepository',
}
