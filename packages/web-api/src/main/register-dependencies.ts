import * as awilix from "awilix";
import {
  AcceptAssociationInvitationUseCase,
  DeleteActivityFromStudentListUseCase,
  GetActivitiesUseCase,
  GetActivityUseCase,
  GetAssociationInvitationUseCase,
  GetInstructorStudentsUseCase,
  GetStudentOutputUseCase,
  GetStudentOutputsUseCase,
  InsertActivityIntoStudentListUseCase,
  InsertFeedbackToActivityUseCase,
  NewAssociationInvitationUseCase,
  NewActivityInstructionUseCase,
  NewActivityUseCase,
  NewStudentOutputUseCase,
  NewUserUseCase,
  UpdateUserUseCase,
} from "@application/use-cases";
import {
  AcceptAssociationInvitationControllerFactory,
  DeleteActivityFromStudentListControllerFactory,
  GetActivitiesOpenControllerFactory,
  GetActivitiesControllerFactory,
  GetActivityControllerFactory,
  GetActivityOpenControllerFactory,
  GetAssociationInvitationControllerFactory,
  GetInstructorStudentsControllerFactory,
  GetStudentOutputControllerFactory,
  GetStudentOutputsControllerFactory,
  NewActivityControllerFactory,
  NewActivityInstructionControllerFactory,
  NewStudentOutputControllerFactory,
  NewUserControllerFactory,
  InsertActivityListControllerFactory,
  InsertAssociationInvitationControllerFactory,
  InsertFeedbackToActivityControllerFactory,
  UpdateUserControllerFactory,
} from "@adapters/REST-controllers";
import {
  AssociationInvitationRepository,
  ActivityRepository,
  UserRepository,
  InstructorRepository,
  StudentRepository,
  StudentOutputRepository,
} from "@adapters/repositories";
import { AssociationInvitationEmail } from "@adapters/services";
import {
  JWTTokenService,
  IdGenerator,
  putFileInReq,
  BCryptEncryptionService,
  SendgridEmailService,
  S3Service,
} from "@language-app/common-platform";
import { Dependencies } from "@main";

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    // controllers
    acceptAssociationInvitationController: awilix.asFunction(
      AcceptAssociationInvitationControllerFactory
    ),
    deleteActivityListControllerFactory: awilix.asFunction(
      DeleteActivityFromStudentListControllerFactory
    ),
    [Dependencies.GETACTIVITIESCONTROLLER]: awilix.asFunction(
      GetActivitiesControllerFactory
    ),
    getActivitiesOpenController: awilix.asFunction(
      GetActivitiesOpenControllerFactory
    ),
    getActivityController: awilix.asFunction(GetActivityControllerFactory),
    getActivityOpenController: awilix.asFunction(
      GetActivityOpenControllerFactory
    ),
    getAssociationInvitationController: awilix.asFunction(
      GetAssociationInvitationControllerFactory
    ),
    getInstructorStudentsController: awilix.asFunction(
      GetInstructorStudentsControllerFactory
    ),
    [Dependencies.GETSTUDENTOUTPUTCONTROLLER]: awilix.asFunction(
      GetStudentOutputControllerFactory
    ),
    [Dependencies.GETSTUDENTOUTPUTSCONTROLLER]: awilix.asFunction(
      GetStudentOutputsControllerFactory
    ),
    insertActivityListControllerFactory: awilix.asFunction(
      InsertActivityListControllerFactory
    ),
    insertAssociationInvitationControllerFactory: awilix.asFunction(
      InsertAssociationInvitationControllerFactory
    ),
    insertFeedbackToActivityControllerFactory: awilix.asFunction(
      InsertFeedbackToActivityControllerFactory
    ),
    [Dependencies.NEWACTIVITYCONTROLLER]: awilix.asFunction(
      NewActivityControllerFactory
    ),
    newActivityInstructionController: awilix.asFunction(
      NewActivityInstructionControllerFactory
    ),
    [Dependencies.NEWSTUDENTOUTPUTCONTROLLER]: awilix.asFunction(
      NewStudentOutputControllerFactory
    ),
    [Dependencies.NEWUSERCONTROLLER]: awilix.asFunction(
      GetStudentOutputControllerFactory
    ),
    [Dependencies.NEWUSERCONTROLLER]: awilix.asFunction(
      NewUserControllerFactory
    ),
    UpdateUserControllerFactory: awilix.asFunction(UpdateUserControllerFactory),

    // services
    [Dependencies.ENCRYPTIONSERVICE]: awilix.asClass(BCryptEncryptionService),
    [Dependencies.IDSERVICE]: awilix.asClass(IdGenerator),
    [Dependencies.TOKENSERVICE]: awilix.asClass(JWTTokenService),
    [Dependencies.EMAILSERVICE]: awilix.asClass(SendgridEmailService),
    [Dependencies.STORAGESERVICE]: awilix.asClass(S3Service),
    invitationEmailService: awilix
      .asClass(AssociationInvitationEmail)
      .classic(),

    // middleware
    [Dependencies.FILEMIDDLEWARE]: awilix.asValue(putFileInReq),

    // use cases
    acceptAssociationInvitationUseCase: awilix
      .asClass(AcceptAssociationInvitationUseCase)
      .classic(),
    insertActivityListUseCase: awilix
      .asClass(InsertActivityIntoStudentListUseCase)
      .classic(),
    getActivitiesUseCase: awilix.asClass(GetActivitiesUseCase).classic(),
    getActivityUseCase: awilix.asClass(GetActivityUseCase).classic(),
    getAssociationInvitationUseCase: awilix
      .asClass(GetAssociationInvitationUseCase)
      .classic(),
    getInstructorStudentsUseCase: awilix
      .asClass(GetInstructorStudentsUseCase)
      .classic(),
    getStudentOutputUseCase: awilix.asClass(GetStudentOutputUseCase).classic(),
    getStudentOutputsUseCase: awilix
      .asClass(GetStudentOutputsUseCase)
      .classic(),
    deleteActivityFromStudentListUseCase: awilix
      .asClass(DeleteActivityFromStudentListUseCase)
      .classic(),
    insertAssociationInvitationUseCase: awilix
      .asClass(NewAssociationInvitationUseCase)
      .classic(),
    insertFeedbackToActivityUseCase: awilix
      .asClass(InsertFeedbackToActivityUseCase)
      .classic(),
    newActivityInstructionUseCase: awilix
      .asClass(NewActivityInstructionUseCase)
      .classic(),
    newActivityUseCase: awilix.asClass(NewActivityUseCase).classic(),
    newStudentOutputUseCase: awilix.asClass(NewStudentOutputUseCase).classic(),
    [Dependencies.NEWUSERUSECASE]: awilix.asClass(NewUserUseCase).classic(),
    updateUserUseCase: awilix.asClass(UpdateUserUseCase).classic(),

    // repositories
    associationInvitationTokenRepository: awilix.asClass(
      AssociationInvitationRepository
    ),
    [Dependencies.ACTIVITYREPOSITORY]: awilix.asClass(ActivityRepository),
    [Dependencies.USERREPOSITORY]: awilix.asClass(UserRepository),
    studentOutputRepository: awilix.asClass(StudentOutputRepository),
    instructorRepository: awilix.asClass(InstructorRepository),
    studentRepository: awilix.asClass(StudentRepository),
  });
};
