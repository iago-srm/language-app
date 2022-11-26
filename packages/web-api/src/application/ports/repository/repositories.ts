import {
  ActivityDTO,
  ActivityInstructionDTO,
  CEFR,
  UserDTO,
  StudentOutputDTO,
  InstructorDTO,
  StudentDTO,
  AssociationInvitationTokenDTO,
} from ".";
import { IPaginatedParams } from "@language-app/common-platform";

interface IGetActivitiesInput extends IPaginatedParams {
  instructorId?: string;
  title?: string;
  cefr?: CEFR;
  topics?: string[];
  contentTypes?: string[];
  ids?: number[];
}

export interface IActivityRepository {
  getActivities: (args: IGetActivitiesInput) => Promise<Partial<ActivityDTO>[]>;
  getStudentListActivityIdsByStudentId: (
    studentId: string
  ) => Promise<number[]>;
  insertActivityIntoStudentList: (
    studentId: string,
    activityId: number
  ) => Promise<void>;
  deleteActivityFromStudentList: (
    studentId: string,
    activityId: number
  ) => Promise<void>;
  getActivityById: (
    id: number
  ) => Promise<ActivityDTO & { instructions: ActivityInstructionDTO[] }>;
  insertActivity: (
    instructorId: string,
    activity: ActivityDTO
  ) => Promise<ActivityDTO>;
  // insertNewInstructions: (activityId: number, instructions: ActivityInstructionDTO[]) => Promise<Partial<ActivityInstructionDTO>[]>;
}

export interface IUserRepository {
  insertUserAndStudent: (
    user: Partial<UserDTO>,
    newId: string
  ) => Promise<UserDTO>;
  insertUserAndInstructor: (
    user: Partial<UserDTO>,
    newId: string
  ) => Promise<UserDTO>;
  getUserById: (id: string) => Promise<UserDTO>;
  getUserByAuthApiId: (authApiId: string) => Promise<UserDTO>;
  updateUser: (user: Partial<UserDTO>, authApiId: string) => Promise<UserDTO>;
}

export interface IInstructorRepository {
  getInstructorByUserId: (
    userId: string
  ) => Promise<{ id: string; user: { name: string } }>;
  // getThisInstructorStudentIds: (instructorId: string) => Promise<string[]>;
  getThisInstructorStudents: (
    instructorId: string
  ) => Promise<{ id: string; name: string }[]>;
}

export interface IStudentRepository {
  getStudentByUserId: (userId: string) => Promise<StudentDTO>;
  getStudentByUserEmail: (email: string) => Promise<StudentDTO>;
  assignInstructor: (studentId: string, instructorId: string) => Promise<any>;
}

interface IGetStudentOutputParams extends IPaginatedParams {
  studentIds: string[];
}
export interface IStudentOutputRepository {
  getStudentOutputById: (outputId: number) => Promise<StudentOutputDTO>;
  getStudentOutputsByStudentIds: (
    args: IGetStudentOutputParams
  ) => Promise<(Partial<StudentOutputDTO> & Partial<ActivityDTO>)[]>;
  insertStudentOutput: (
    output: Partial<StudentOutputDTO>
  ) => Promise<Partial<StudentOutputDTO>>;
  insertStudentOutputFeedbacks: (
    feedbacks: { instructionOutputId: string; feedback: string }[]
  ) => Promise<any>;
  updateStudentOutputById: (
    outputId: number,
    args: Partial<StudentOutputDTO>
  ) => Promise<any>;
}

export interface IAssociationInvitationRepository {
  getTokenByTokenValue: (
    token: string
  ) => Promise<
    AssociationInvitationTokenDTO & {
      instructor: Partial<InstructorDTO | { user: Partial<UserDTO> }>;
    }
  >;
  // getInstructorByTokenValue: (token: string) => Promise<Partial<InstructorDTO>>;
  insertToken: (
    token: AssociationInvitationTokenDTO
  ) => Promise<AssociationInvitationTokenDTO>;
  updateToken: (
    tokenId: string,
    data: Partial<AssociationInvitationTokenDTO>
  ) => Promise<AssociationInvitationTokenDTO>;
  getTokenByStudentAndInstructorIds: (
    instructorId: string,
    studentId: string
  ) => Promise<AssociationInvitationTokenDTO>;
  getTokenByStudentId: (
    instructorId: string
  ) => Promise<AssociationInvitationTokenDTO>;
  removeAssociationByStudentId: (studentId: string) => Promise<any>;
}
