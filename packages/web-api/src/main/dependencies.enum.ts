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
  NEWACTIVITYUSECASE = 'newActivityUseCase',
  NEWACTIVITYINSTRUCTIONUSECASE = 'newActivityInstructionUseCase',
  NEWSTUDENTOUTPUTUSECASE = 'newStudentOutputUseCase',
  GETSTUDENTOUTPUTUSECASE = 'getStudentOutputUseCase',

  // repositories
  ACTIVITYREPOSITORY = 'activityRepository',
  STUDENTOUTPUTREPOSITORY = 'studentOutputRepository',
  USERREPOSITORY = 'userRepository'
}
