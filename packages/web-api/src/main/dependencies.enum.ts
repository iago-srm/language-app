export enum Dependencies {
  // controllers
  GETACTIVITIESCONTROLLER = "getActivitiesController",
  GETSTUDENTOUTPUTCONTROLLER = "getStudentOutputController",
  GETSTUDENTOUTPUTSCONTROLLER = "getStudentOutputsController",
  NEWACTIVITYCONTROLLER = "newActivityController",
  NEWSTUDENTOUTPUTCONTROLLER = "newStudentOutputController",
  NEWUSERCONTROLLER = "newUserController",

  // services
  TOKENSERVICE = "tokenService",
  IDSERVICE = "idService",
  ENCRYPTIONSERVICE = "encryptionService",
  EMAILSERVICE = "emailService",
  LOGGER = "logger",
  STORAGESERVICE = "storageService",
  AUTHEMAILSERVICE = "authEmailService",

  // middleware
  FILEMIDDLEWARE = "fileMiddleware",

  // use cases
  GETSTUDENTACTIVITIESUSECASE = "getStudentActivitiesUseCase",
  GETINSTRUCTORACTIVITIESUSECASE = "getInstructorActivitiesUseCase",
  GETSTUDENTOUTPUTUSECASE = "getStudentOutputUseCase",
  GETSTUDENTOUTPUTSUSECASE = "getStudentOutputsUseCase",
  NEWACTIVITYINSTRUCTIONUSECASE = "newActivityInstructionUseCase",
  NEWACTIVITYUSECASE = "newActivityUseCase",
  NEWSTUDENTOUTPUTUSECASE = "newStudentOutputUseCase",
  NEWUSERUSECASE = "newUserUseCase",

  // repositories
  ACTIVITYREPOSITORY = "activityRepository",
  STUDENTOUTPUTREPOSITORY = "studentOutputRepository",
  USERREPOSITORY = "userRepository",
}
