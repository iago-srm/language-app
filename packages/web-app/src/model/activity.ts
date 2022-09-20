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

export enum CEFRColors {
    "A1" = "#69B34C",
    "A2" = "#ACB334",
    "B1" = "#FAB733",
    "B2" = "#FF8E15",
    "C1" = "#FF4E11",
    "C2" = "#FF0D0D",
}

export enum TopicsColors {
    'SCIENCE_&_TECHNOLOGY' = "#90B5B6",
    'ARTS' = "pink",
    "CURRENT_AFFAIRS" = "#C6DC93", 
    'SPORTS' = "#FFD9AD"
}