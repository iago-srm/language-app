import {
  ActivityDTO,
  ActivityInstructionDTO,
  CEFR,
  UserDTO,
  StudentOutputDTO,
  InstructorDTO,
  StudentDTO,
  AssociationInvitationTokenDTO
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
  getInstructorByUserId: (userId: string) => Promise<{ id: string, user: { name: string}}>;
  getThisInstructorStudentIds: (instructorId: string) => Promise<string[]>;
}

export interface IStudentRepository {
  getStudentByUserId: (userId:string) => Promise<StudentDTO>;
  getStudentByUserEmail: (email: string) => Promise<StudentDTO>;
  assignInstructor: (studentId: string, instructorId: string) => Promise<any>;
}

export interface IStudentOutputRepository {
  getStudentOutputById: (outputId: number) => Promise<StudentOutputDTO>;
  getStudentOutputsByStudentIds: (studentId: string[]) => Promise<(Partial<StudentOutputDTO> & Partial<ActivityDTO>)[]>;
  insertStudentOutput: (output: Partial<StudentOutputDTO>) => Promise<Partial<StudentOutputDTO>>;
  insertStudentOutputFeedbacks: (feedbacks: { instructionOutputId: string, feedback: string }[]) => Promise<any>;

}

export interface IAssociationInvitationTokenRepository {
  getTokenByTokenValue: (token: string) => Promise<AssociationInvitationTokenDTO | null>;
  insertToken: (token: AssociationInvitationTokenDTO) => Promise<AssociationInvitationTokenDTO>;
  updateToken: (tokenId: string, data: Partial<AssociationInvitationTokenDTO>) => Promise<AssociationInvitationTokenDTO>;
}