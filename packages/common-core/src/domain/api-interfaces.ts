export interface IGetActivitiesParams {}
export type IGetActivitiesResponse = {
  cursor: number;
  activities: {
    id: string;
    title: string;
    description?: string;
    cefr: string;
    topics: string[];
  }[]
}
export interface GetActivityParams {
  id: number;
}

export interface GetActivityResponse {}

// export interface PostActivityParams {}
// export interface PostActivityResponse {}

interface Option {
  text: string;
  id: string;
}
export interface IPostActivity {
  params: {
    title: string;
    cefr: string;
    // timeToComplete: number;
    startTime: number;
    endTime: number;
    content: string;
    instructions: {
      text: string;
      optionsAnswers?: Option[];
      textAnswer: string;
      options?: Option[];
    }[]
  }
  response: void;
}

export interface PostActivityInstructionParams {}
export interface PostActivityInstructionResponse {}

export interface SignOutUser {
  params: {
    tokenVersion: number;
  }
  response: void;
}