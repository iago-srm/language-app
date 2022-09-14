export enum InstructionType {
    OPTIONS = "options",
    TEXT = "text",
}
  
export interface Option {
    text: string;
    id: string;
    isCorrect: boolean;
}

export interface Instruction {
    id: string;
    type: InstructionType;
    text: string;
    options?: Option[];
    answer: string | string[]
  }
  