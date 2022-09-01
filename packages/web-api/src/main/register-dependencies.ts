import * as awilix from "awilix";
import {
  GetStudentActivitiesUseCase,
  GetInstructorActivitiesUseCase,
  GetStudentOutputUseCase,
  GetStudentOutputsUseCase,
  NewActivityInstructionUseCase,
  NewActivityUseCase,
  NewStudentOutputUseCase,
  NewUserUseCase,
} from '@application/use-cases';
import {
  GetActivitiesControllerFactory,
  GetStudentOutputControllerFactory,
  GetStudentOutputsControllerFactory,
  NewActivityControllerFactory,
  NewStudentOutputControllerFactory,
  NewUserControllerFactory
} from '@adapters/REST-controllers';
import {
  ActivityRepository,
  StudentOutputRepository,
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
    [Dependencies.GETSTUDENTOUTPUTCONTROLLER]: awilix.asFunction(GetStudentOutputControllerFactory),
    [Dependencies.GETSTUDENTOUTPUTSCONTROLLER]: awilix.asFunction(GetStudentOutputsControllerFactory),
    [Dependencies.NEWACTIVITYCONTROLLER]: awilix.asFunction(NewActivityControllerFactory),
    [Dependencies.NEWSTUDENTOUTPUTCONTROLLER]: awilix.asFunction(NewStudentOutputControllerFactory),
    [Dependencies.NEWUSERCONTROLLER]: awilix.asFunction(GetStudentOutputControllerFactory),
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
    'getStudentActivitiesUseCase': awilix.asClass(GetStudentActivitiesUseCase).classic(),
    [Dependencies.GETINSTRUCTORACTIVITIESUSECASE]: awilix.asClass(GetInstructorActivitiesUseCase).classic(),
    'getStudentOutputUseCase': awilix.asClass(GetStudentOutputUseCase).classic(),
    'getStudentOutputsUseCase': awilix.asClass(GetStudentOutputsUseCase).classic(),
    'newActivityInstructionUseCase': awilix.asClass(NewActivityInstructionUseCase).classic(),
    'newActivityUseCase': awilix.asClass(NewActivityUseCase).classic(),
    'newStudentOutputUseCase': awilix.asClass(NewStudentOutputUseCase).classic(),
    [Dependencies.NEWUSERUSECASE]: awilix.asClass(NewUserUseCase).classic(),

    // repositories
    [Dependencies.ACTIVITYREPOSITORY]: awilix.asClass(ActivityRepository),
    [Dependencies.USERREPOSITORY]: awilix.asClass(UserRepository),
    'studentOutputRepository': awilix.asClass(StudentOutputRepository),
  })
}