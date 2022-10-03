export interface UserDTO {
  id: string;
  name?: string;
  email: string;
  role?: string;
  tokenVersion?: number;
  authApiId: string;
  image: string;
}

export interface StudentOutputDTO {
  activityId: number,
  studentId: string,
  outputs: InstructionStudentOutputDTO[];
  feedbackGiven: boolean;
}

export interface FeedbackToInstructionStudentOutputDTO {
  message: string;
}

export interface InstructorDTO {
  id: string;
  userId: string;
  user?: UserDTO;
}

export interface StudentDTO {
  id: string;
  userId: string;
  cefr: CEFR;
  user?: UserDTO;
}

export interface InstructionStudentOutputDTO {
  id?: string;
  optionsSelectionsIds?: ActivityInstructionOptionDTO[];
  textOutput?: string;
  feedback?: FeedbackToInstructionStudentOutputDTO;
}

export interface ActivityInstructionOptionDTO {
  id: string;
  text: string;
}

export interface ActivityInstructionDTO {
  id?: string;
  text: string;
  optionsAnswers?: { id: string }[];
  isMultiCorrect?: boolean;
  textAnswer?: string;
  options?: ActivityInstructionOptionDTO[];
  type: INSTRUCTIONTYPE;
}

export type CEFR = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type CONTENTTYPE = 'TEXT' | 'VIDEO';
export type INSTRUCTIONTYPE = "TEXT" | "OPTIONS";

export interface ActivityDTO {
  id?: number;
  instructorId: string;
  title: string;
  contentType: CONTENTTYPE;
  content: string;
  startTime?: number;
  endTime?: number;
  cefr: CEFR;
  topics: string[];
  instructions?: ActivityInstructionDTO[];
  timeToComplete: number;
  createdAt?: Date;
  description?: string;
}


