import * as awilix from "awilix";
import {
  GetStudentActivitiesUseCase,
  GetInstructorActivitiesUseCase,
  NewUserUseCase
} from '@application/use-cases';
import {
  GetActivitiesControllerFactory,
  NewUserControllerFactory
} from '@adapters/REST-controllers';
import {
  ActivityRepository,
  UserRepository
} from '@adapters/repositories';
import {
} from '@adapters/services';
import {
  JWTTokenService,
  IdGenerator,
  putFileInReq,
  BCryptEncryptionService,
  SendgridEmailService,
  S3Service
} from '@language-app/common';
import { Dependencies } from '@main';

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    // controllers
    [Dependencies.GETACTIVITIESCONTROLLER]: awilix.asFunction(GetActivitiesControllerFactory),
    [Dependencies.NEWUSERCONTROLLER]: awilix.asFunction(NewUserControllerFactory),

    // services
    [Dependencies.ENCRYPTIONSERVICE]: awilix.asClass(BCryptEncryptionService),
    [Dependencies.IDSERVICE]: awilix.asClass(IdGenerator),
    [Dependencies.TOKENSERVICE]: awilix.asClass(JWTTokenService),
    [Dependencies.EMAILSERVICE]: awilix.asClass(SendgridEmailService),
    [Dependencies.STORAGESERVICE]: awilix.asClass(S3Service),

    // middleware
    [Dependencies.FILEMIDDLEWARE]: awilix.asValue(putFileInReq),

    // use cases
    [Dependencies.GETINSTRUCTORACTIVITIESUSECASE]: awilix.asClass(GetInstructorActivitiesUseCase).classic(),
    [Dependencies.GETSTUDENTACTIVITIESUSECASE]: awilix.asClass(GetStudentActivitiesUseCase).classic(),
    [Dependencies.NEWUSERUSECASE]: awilix.asClass(NewUserUseCase).classic(),

    // repositories
    [Dependencies.ACTIVITYREPOSITORY]: awilix.asClass(ActivityRepository),
    [Dependencies.USERREPOSITORY]: awilix.asClass(UserRepository)
  })
}
