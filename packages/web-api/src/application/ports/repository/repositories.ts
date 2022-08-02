import {
  ActivityDTO,
  ActivityInstructionDTO,
  CEFR,
  UserDTO
} from '.';

export interface IActivityRepository {
  getActivitiesByInstructorIdOrAll: (
    cursor: number,
    instructorId?: string,
    title?: string,
    cefr?: CEFR,
  ) => Promise<Partial<ActivityDTO>[]>;
  getActivityById: (id: number) => Promise<ActivityDTO>;
  insertActivity: (activity: ActivityDTO) => Promise<Partial<ActivityDTO>>;
  insertNewInstructions: (activityId: number, instructions: ActivityInstructionDTO[]) => Promise<Partial<ActivityDTO>>;
}

export interface IUserRepository {
  insertUserAndStudent: (user: Partial<UserDTO>, id: string) => Promise<UserDTO>;
  insertUserAndInstructor: (user: Partial<UserDTO>, id: string) => Promise<UserDTO>;
}
