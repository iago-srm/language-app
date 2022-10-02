import {
  ActivityDTO,
  ActivityInstructionDTO,
  CEFR,
  UserDTO,
  StudentOutputDTO,
  InstructorDTO,
  StudentDTO
} from '.';

type GetActivitiesInput = {
  instructorId?: string,
  cursor?: number,
  title?: string,
  cefr?: CEFR,
  topics?: string[],
  contentTypes?: string[],
  ids?: number[];
}

export interface IActivityRepository {
  getActivities: (args: GetActivitiesInput) => Promise<Partial<ActivityDTO>[]>;
  getActivityIdsByStudentList: (studentId: string) => Promise<number[]>;
  insertActivityIntoStudentList: (studentId: string, activityId: number) => Promise<void>;
  getActivityById: (id: number) => Promise<ActivityDTO & { instructions: ActivityInstructionDTO[] }>;
  insertActivity: (instructorId: string, activity: ActivityDTO) => Promise<ActivityDTO>;
  // insertStudentOutputFeedbacks: (studentOutputId: number, feedbacks: { instructionOutputId: string, feedback: string }) => Promise<any>;
  getStudentOutputById: (outputId: number) => Promise<StudentOutputDTO>;
  getStudentOutputsByStudentId: (studentId: string) => Promise<(Partial<StudentOutputDTO> & Partial<ActivityDTO>)[]>;
  insertStudentOutput: (output: StudentOutputDTO) => Promise<Partial<StudentOutputDTO>>;
  // insertNewInstructions: (activityId: number, instructions: ActivityInstructionDTO[]) => Promise<Partial<ActivityInstructionDTO>[]>;
}

export interface IUserRepository {
  insertUserAndStudent: (user: Partial<UserDTO>, newId: string) => Promise<UserDTO>;
  insertUserAndInstructor: (user: Partial<UserDTO>, newId: string) => Promise<UserDTO>;
  getUserById: (id: string) => Promise<UserDTO>;
  getUserByAuthApiId: (authApiId: string) => Promise<UserDTO>;
  updateUser: (user: Partial<UserDTO>, authApiId: string) => Promise<UserDTO>;
}

export interface IInstructorRepository {
  getInstructorByUserId: (userId:string) => Promise<InstructorDTO>;
}

export interface IStudentRepository {
  getStudentByUserId: (userId:string) => Promise<StudentDTO>;
}

export interface IStudentOutputRepository {
  getStudentOutputById: (outputId: number) => Promise<StudentOutputDTO>;
  getStudentOutputsByStudentId: (studentId: string) => Promise<(Partial<StudentOutputDTO> & Partial<ActivityDTO>)[]>;
  insertStudentOutput: (output: StudentOutputDTO) => Promise<StudentOutputDTO>;
}