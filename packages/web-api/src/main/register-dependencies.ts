import * as awilix from "awilix";
import {
  GetActivitiesUseCase,
  GetActivityUseCase,
  GetStudentOutputUseCase,
  GetStudentOutputsUseCase,
  NewActivityInstructionUseCase,
  NewActivityUseCase,
  NewStudentOutputUseCase,
  NewUserUseCase,
  InsertActivityIntoStudentListUseCase,
  SignOutUserUseCase
} from '@application/use-cases';
import {
  GetActivitiesControllerFactory,
  GetActivityControllerFactory,
  GetStudentOutputControllerFactory,
  GetStudentOutputsControllerFactory,
  NewActivityControllerFactory,
  NewActivityInstructionControllerFactory,
  NewStudentOutputControllerFactory,
  NewUserControllerFactory,
  InsertActivityListControllerFactory,
  SignOutUserControllerFactory
} from '@adapters/REST-controllers';
import {
  ActivityRepository,
  UserRepository,
  InstructorRepository,
  StudentRepository
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
} from '@language-app/common-platform';
import { Dependencies } from '@main';

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    // controllers
    [Dependencies.GETACTIVITIESCONTROLLER]: awilix.asFunction(GetActivitiesControllerFactory),
    "getActivityController": awilix.asFunction(GetActivityControllerFactory),
    [Dependencies.GETSTUDENTOUTPUTCONTROLLER]: awilix.asFunction(GetStudentOutputControllerFactory),
    [Dependencies.GETSTUDENTOUTPUTSCONTROLLER]: awilix.asFunction(GetStudentOutputsControllerFactory),
    [Dependencies.NEWACTIVITYCONTROLLER]: awilix.asFunction(NewActivityControllerFactory),
    "newActivityInstructionController": awilix.asFunction(NewActivityInstructionControllerFactory),
    [Dependencies.NEWSTUDENTOUTPUTCONTROLLER]: awilix.asFunction(NewStudentOutputControllerFactory),
    [Dependencies.NEWUSERCONTROLLER]: awilix.asFunction(GetStudentOutputControllerFactory),
    [Dependencies.NEWUSERCONTROLLER]: awilix.asFunction(NewUserControllerFactory),
    "insertActivityListUseCaseControllerFactory": awilix.asFunction(InsertActivityListControllerFactory),
    "SignOutUserControllerFactory": awilix.asFunction(SignOutUserControllerFactory),

    // services
    [Dependencies.ENCRYPTIONSERVICE]: awilix.asClass(BCryptEncryptionService),
    [Dependencies.IDSERVICE]: awilix.asClass(IdGenerator),
    [Dependencies.TOKENSERVICE]: awilix.asClass(JWTTokenService),
    [Dependencies.EMAILSERVICE]: awilix.asClass(SendgridEmailService),
    [Dependencies.STORAGESERVICE]: awilix.asClass(S3Service),

    // middleware
    [Dependencies.FILEMIDDLEWARE]: awilix.asValue(putFileInReq),

    // use cases
    'getActivitiesUseCase': awilix.asClass(GetActivitiesUseCase).classic(),
    'getActivityUseCase': awilix.asClass(GetActivityUseCase).classic(),
    'getStudentOutputUseCase': awilix.asClass(GetStudentOutputUseCase).classic(),
    'getStudentOutputsUseCase': awilix.asClass(GetStudentOutputsUseCase).classic(),
    'newActivityInstructionUseCase': awilix.asClass(NewActivityInstructionUseCase).classic(),
    'newActivityUseCase': awilix.asClass(NewActivityUseCase).classic(),
    'newStudentOutputUseCase': awilix.asClass(NewStudentOutputUseCase).classic(),
    [Dependencies.NEWUSERUSECASE]: awilix.asClass(NewUserUseCase).classic(),
    'insertActivityListUseCase': awilix.asClass(InsertActivityIntoStudentListUseCase).classic(),
    'signOutUserUseCase': awilix.asClass(SignOutUserUseCase).classic(),

    // repositories
    [Dependencies.ACTIVITYREPOSITORY]: awilix.asClass(ActivityRepository),
    [Dependencies.USERREPOSITORY]: awilix.asClass(UserRepository),
    // 'studentOutputRepository': awilix.asClass(StudentOutputRepository),
    'instructorRepository': awilix.asClass(InstructorRepository),
    'studentRepository': awilix.asClass(StudentRepository),
  })
}
