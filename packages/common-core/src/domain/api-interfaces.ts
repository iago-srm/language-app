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

interface IActivity {
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

export interface IGetActivity {
  params: {
    id: number;
  }
  response: {
    activity: IActivity;
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
export interface ISignOutUser {
  params: {
    tokenVersion: number;
    authApiId: string;
  }
  response: void;
}

export interface IPostNewUser {
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

export interface INewAssociationInvitation {
  params: {
    email: string;
  }
}

export interface IGetAssociationInvitation {
  params: {
    token: string;
  }
  response: {
    instructor: {
      image: string;
      name: string;
    }
  }
}

export interface IGetStudentOutputs {
  params: void;
  response: {
    id: string;
    activity: {
      cefr: string;
      title: string;
      topics: string[];
      contentType: string;
      instructor: {
        user: {
          name: string;
          image: string;
        }

      }
    },
    createdAt: string;
    feedbackGiven: boolean;
  }[]
}

interface IActivityWithOutput extends IActivity {
  instructor: {
    user: {
      name: string;
      image: string;
    }
  },
  outputs: {
    instructionId: string;
    textAnswer: string;
    optionsSelectionsIds: string[];
  }
}
export interface IGetStudentOutput {
  params: {
    id: number
  };
  response: {
    id: string;
    activity: IActivityWithOutput,
    student: {
      user: {
        name: string;
      }
    }
    createdAt: string;
    feedbackGiven: boolean;
    outputs: {
      id: string;
      textOutput: string;
      optionsSelections: {
        id: string;
      }[]
      instructionId: string;
      feedback: {
        message: string;
      }
    }[]
  }
}

export interface IPostFeedbackToOutput {
  params: {
    outputId: number;
    feedbacks: {
      instructionOutputId: string;
      feedback: string;
    }[]
  }
}