import * as awilix from "awilix";
import {
  AcceptAssociationInvitationUseCase,
  GetActivitiesUseCase,
  GetActivityUseCase,
  GetStudentOutputUseCase,
  GetStudentOutputsUseCase,
  InsertActivityIntoStudentListUseCase,
  InsertFeedbackToActivityUseCase,
  NewAssociationInvitationUseCase,
  NewActivityInstructionUseCase,
  NewActivityUseCase,
  NewStudentOutputUseCase,
  NewUserUseCase,
  SignOutUserUseCase
} from '@application/use-cases';
import {
  AcceptAssociationInvitationControllerFactory,
  GetActivitiesControllerFactory,
  GetActivityControllerFactory,
  GetStudentOutputControllerFactory,
  GetStudentOutputsControllerFactory,
  NewActivityControllerFactory,
  NewActivityInstructionControllerFactory,
  NewStudentOutputControllerFactory,
  NewUserControllerFactory,
  InsertActivityListControllerFactory,
  InsertAssociationInvitationControllerFactory,
  InsertFeedbackToActivityControllerFactory,
  SignOutUserControllerFactory
} from '@adapters/REST-controllers';
import {
  AssociationInvitationTokenRepository,
  ActivityRepository,
  UserRepository,
  InstructorRepository,
  StudentRepository,
  StudentOutputRepository
} from '@adapters/repositories';
import {
  AssociationInvitationEmail,
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
    "acceptAssociationInvitationController": awilix.asFunction(AcceptAssociationInvitationControllerFactory),
    [Dependencies.GETACTIVITIESCONTROLLER]: awilix.asFunction(GetActivitiesControllerFactory),
    "getActivityController": awilix.asFunction(GetActivityControllerFactory),
    [Dependencies.GETSTUDENTOUTPUTCONTROLLER]: awilix.asFunction(GetStudentOutputControllerFactory),
    [Dependencies.GETSTUDENTOUTPUTSCONTROLLER]: awilix.asFunction(GetStudentOutputsControllerFactory),
    "insertActivityListControllerFactory": awilix.asFunction(InsertActivityListControllerFactory),
    "insertAssociationInvitationControllerFactory": awilix.asFunction(InsertAssociationInvitationControllerFactory),
    "insertFeedbackToActivityControllerFactory": awilix.asFunction(InsertFeedbackToActivityControllerFactory),
    [Dependencies.NEWACTIVITYCONTROLLER]: awilix.asFunction(NewActivityControllerFactory),
    "newActivityInstructionController": awilix.asFunction(NewActivityInstructionControllerFactory),
    [Dependencies.NEWSTUDENTOUTPUTCONTROLLER]: awilix.asFunction(NewStudentOutputControllerFactory),
    [Dependencies.NEWUSERCONTROLLER]: awilix.asFunction(GetStudentOutputControllerFactory),
    [Dependencies.NEWUSERCONTROLLER]: awilix.asFunction(NewUserControllerFactory),
    "SignOutUserControllerFactory": awilix.asFunction(SignOutUserControllerFactory),

    // services
    [Dependencies.ENCRYPTIONSERVICE]: awilix.asClass(BCryptEncryptionService),
    [Dependencies.IDSERVICE]: awilix.asClass(IdGenerator),
    [Dependencies.TOKENSERVICE]: awilix.asClass(JWTTokenService),
    [Dependencies.EMAILSERVICE]: awilix.asClass(SendgridEmailService),
    [Dependencies.STORAGESERVICE]: awilix.asClass(S3Service),
    'invitationEmailService': awilix.asClass(AssociationInvitationEmail).classic(),

    // middleware
    [Dependencies.FILEMIDDLEWARE]: awilix.asValue(putFileInReq),

    // use cases
    'acceptAssociationInvitationUseCase': awilix.asClass(AcceptAssociationInvitationUseCase).classic(),
    'getActivitiesUseCase': awilix.asClass(GetActivitiesUseCase).classic(),
    'getActivityUseCase': awilix.asClass(GetActivityUseCase).classic(),
    'getStudentOutputUseCase': awilix.asClass(GetStudentOutputUseCase).classic(),
    'getStudentOutputsUseCase': awilix.asClass(GetStudentOutputsUseCase).classic(),
    'insertActivityListUseCase': awilix.asClass(InsertActivityIntoStudentListUseCase).classic(),
    'insertAssociationInvitationUseCase': awilix.asClass(NewAssociationInvitationUseCase).classic(),
    'insertFeedbackToActivityUseCase': awilix.asClass(InsertFeedbackToActivityUseCase).classic(),
    'newActivityInstructionUseCase': awilix.asClass(NewActivityInstructionUseCase).classic(),
    'newActivityUseCase': awilix.asClass(NewActivityUseCase).classic(),
    'newStudentOutputUseCase': awilix.asClass(NewStudentOutputUseCase).classic(),
    [Dependencies.NEWUSERUSECASE]: awilix.asClass(NewUserUseCase).classic(),
    'signOutUserUseCase': awilix.asClass(SignOutUserUseCase).classic(),

    // repositories
    "associationInvitationTokenRepository": awilix.asClass(AssociationInvitationTokenRepository),
    [Dependencies.ACTIVITYREPOSITORY]: awilix.asClass(ActivityRepository),
    [Dependencies.USERREPOSITORY]: awilix.asClass(UserRepository),
    'studentOutputRepository': awilix.asClass(StudentOutputRepository),
    'instructorRepository': awilix.asClass(InstructorRepository),
    'studentRepository': awilix.asClass(StudentRepository),
  })
}
