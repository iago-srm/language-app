import {
  ActivityDTO,
  ActivityInstructionDTO,
  CEFR,
  UserDTO,
  StudentOutputDTO,
  InstructorDTO
} from '.';

export interface IActivityRepository {
  getActivitiesByStudentId: (
    cursor: number,
    studentId: string,
    title?: string,
    cefr?: CEFR
  ) => Promise<Partial<ActivityDTO>[]>;
  getActivitiesByInstructorIdOrAll: (
    cursor: number,
    instructorId?: string,
    title?: string,
    cefr?: CEFR,
  ) => Promise<Partial<ActivityDTO>[]>;
  getActivityById: (id: number) => Promise<ActivityDTO>;
  insertActivity: (instructorId: string, activity: ActivityDTO) => Promise<ActivityDTO>;
  insertNewInstructions: (activityId: number, instructions: ActivityInstructionDTO[]) => Promise<Partial<ActivityDTO>>;
}

export interface IUserRepository {
  insertUserAndStudent: (user: Partial<UserDTO>, userId: string, studentId: string) => Promise<UserDTO>;
  insertUserAndInstructor: (user: Partial<UserDTO>, userId: string, instructorId: string) => Promise<UserDTO>;
  getUserById: (id: string) => Promise<UserDTO>;
}

export interface IInstructorRepository {
  getInstructorByUserId: (userId:string) => Promise<InstructorDTO>;
}

export interface IStudentOutputRepository {
  getStudentOutputById: (outputId: number) => Promise<StudentOutputDTO>;
  getStudentOutputsByStudentId: (studentId: string) => Promise<(Partial<StudentOutputDTO> & Partial<ActivityDTO>)[]>;
  insertStudentOutput: (output: StudentOutputDTO) => Promise<StudentOutputDTO>;
}