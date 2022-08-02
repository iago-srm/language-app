export enum Dependencies {
  // controllers
  GETACTIVITIESCONTROLLER = 'getActivitiesController',
  NEWUSERCONTROLLER = 'newUserController',

  // services
  TOKENSERVICE = 'tokenService',
  IDSERVICE = 'idService',
  ENCRYPTIONSERVICE = 'encryptionService',
  EMAILSERVICE = 'emailService',
  LOGGER = 'logger',
  STORAGESERVICE = 'storageService',
  AUTHEMAILSERVICE = 'authEmailService',

  // middleware
  FILEMIDDLEWARE = 'fileMiddleware',

  // use cases
  GETSTUDENTACTIVITIESUSECASE = 'getStudentActivitiesUseCase',
  GETINSTRUCTORACTIVITIESUSECASE = 'getInstructorActivitiesUseCase',
  NEWUSERUSECASE = 'newUserUseCase',

  // repositories
  ACTIVITYREPOSITORY = 'activityRepository',
  USERREPOSITORY = 'userRepository'
}
