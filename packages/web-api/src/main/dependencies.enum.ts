export enum Dependencies {
  // controllers
  GETACTIVITIES = 'getActivities',

  // services
  TOKENSERVICE = 'tokenService',
  IDSERVICE = 'idService',
  ENCRYPTIONSERVICE = 'encryptionService',
  EMAILSERVICE = 'emailService',
  LOGGER = 'logger',
  STORAGESERVICE = 'storageService',
  AUTHEMAILSERVICE = 'authEmailService',

  // use cases
  GETSTUDENTACTIVITIESUSECASE = 'getStudentActivitiesUseCase',
  GETINSTRUCTORACTIVITIESUSECASE = 'getInstructorActivitiesUseCase',

  // repositories
  ACTIVITYREPOSITORY = 'activityRepository'
}
