export interface UserDTO {
  id: string;
  name?: string;
  email: string;
  role?: string;
  tokenVersion?: number;
}

export interface StudentOutputDTO {
  answers: {
    instructionId: string;
    answer: string
  }[];
  feedback?: {
    grade?: number;
    message?: string;
  }
}

export interface InstructorDTO {
  id: string;
  userId: string;
}

export interface StudentDTO {
  id: string;
  userId: string;
  cefr: CEFR;
}

export interface InstructionAnswerDTO {

}

export interface ActivityInstructionDTO {
  text: string;
  answer: string;
  options?: string[];
}

export type CEFR = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type CONTENTTYPE = 'TEXT' | 'VIDEO';

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


