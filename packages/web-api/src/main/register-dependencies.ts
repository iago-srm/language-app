import * as awilix from "awilix";
import {
  GetStudentActivitiesUseCase,
  GetInstructorActivitiesUseCase
} from '@application/use-cases';
import {
  GetActivitiesControllerFactory
} from '@adapters/REST-controllers';
import {
  ActivityRepository
} from '@adapters/repositories';
import {
} from '@adapters/services';
import {
  JWTTokenService,
  IdGenerator,
  BCryptEncryptionService,
  SendgridEmailService,
  S3Service
} from '@language-app/common';
import { Dependencies } from '@main';

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    // controllers


    // services
    [Dependencies.ENCRYPTIONSERVICE]: awilix.asClass(BCryptEncryptionService),
    [Dependencies.IDSERVICE]: awilix.asClass(IdGenerator),
    [Dependencies.TOKENSERVICE]: awilix.asClass(JWTTokenService),
    [Dependencies.EMAILSERVICE]: awilix.asClass(SendgridEmailService),
    [Dependencies.STORAGESERVICE]: awilix.asClass(S3Service),

    // use cases
    [Dependencies.GETINSTRUCTORACTIVITIESUSECASE]: awilix.asClass(GetInstructorActivitiesUseCase).classic(),
    [Dependencies.GETSTUDENTACTIVITIESUSECASE]: awilix.asClass(GetStudentActivitiesUseCase).classic(),

    // repositories
    [Dependencies.ACTIVITYREPOSITORY]: awilix.asClass(ActivityRepository)
  })
}
