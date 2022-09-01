import {
  ActivityDTO,
  ActivityInstructionDTO,
  CEFR,
  UserDTO,
  StudentOutputDTO
} from '.';

export interface IActivityRepository {
  getActivitiesByInstructorIdOrAll: (
    cursor: number,
    instructorId?: string,
    title?: string,
    cefr?: CEFR,
  ) => Promise<Partial<ActivityDTO>[]>;
  getActivityById: (id: number) => Promise<ActivityDTO>;
  insertActivity: (activity: ActivityDTO) => Promise<ActivityDTO>;
  insertNewInstructions: (activityId: number, instructions: ActivityInstructionDTO[]) => Promise<Partial<ActivityDTO>>;
}

export interface IUserRepository {
  insertUserAndStudent: (user: Partial<UserDTO>, id: string) => Promise<UserDTO>;
  insertUserAndInstructor: (user: Partial<UserDTO>, id: string) => Promise<UserDTO>;
}

export interface IStudentOutputRepository {
  getStudentOutputById: (outputId: number) => Promise<StudentOutputDTO>;
  getStudentOutputsByStudentId: (studentId: string) => Promise<(Partial<StudentOutputDTO> & Partial<ActivityDTO>)[]>;
  insertStudentOutput: (output: StudentOutputDTO) => Promise<StudentOutputDTO>;
}