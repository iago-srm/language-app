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
export interface IGetActivity {
  params: {
    id: number;
  }
  response: {
    activity: {
      title: string;
      description: string;
      content: string;
      startTime?: number;
      endTime?: number;
      topics: string[];
      cefr: string;
    }
  }
}

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
    authApiId: string;
  }
  response: void;
}

export interface NewUser {
  params: {
    authApiId: string,
    role: string,
    name: string,
    email: string,
    tokenVersion: string,
    image: string
  },
  response: void;
}