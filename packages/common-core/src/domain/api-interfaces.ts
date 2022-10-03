export type IGetActivities = {
  response: {
    cursor: number;
    activities: {
      id: string;
      title: string;
      description?: string;
      cefr: string;
      topics: string[];
    }[]
  }
}

interface IInstructions {
  id: string;
  text: string;
  type: string;
  isMultiCorrect: boolean;
  optionsAnswers?: {
    id: string;
  }[]
  textAnswer?: string;
  options: {
    id: string;
    text: string;
  }[]
}
export interface IGetActivity {
  params: {
    id: number;
  }
  response: {
    activity: {
      id: string;
      title: string;
      description: string;
      content: string;
      startTime?: number;
      endTime?: number;
      topics: string[];
      cefr: string;
      contentType: string;
      instructions: IInstructions[];
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

export interface IPostStudentOutput {
  params: {
    activityId: string;
    outputs: {
      instructionId: string;
      optionsSelectionsIds?: string[];
      textOutput?: string;
    }[]
  };
  response: {};
}
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