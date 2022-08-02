import { CustomError, DomainRules } from '@language-app/common';
import { ErrorMessagesLabels } from '@common/locale';

// student output
export class InvalidStudentOutputStatusError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessagesLabels.STUDENT_OUTPUT_FEEDBACK_STATUS });
  }
}

// feedbacks
export class InvalidGradeError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessagesLabels.FEEDBACK_GRADE,
      params: {
        possibleValues: DomainRules.CEFR.POSSIBLE_VALUES,
      },
    });
  }
}

export class InvalidFeedbackMessageError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessagesLabels.FEEDBACK_MESSAGE,
      params: {
        possibleValues: DomainRules.CEFR.POSSIBLE_VALUES,
      },
    });
  }
}

// cefr
export class InvalidCEFRError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessagesLabels.CEFR,
      params: {
        possibleValues: DomainRules.CEFR.POSSIBLE_VALUES,
      },
    });
  }
}

// flashcards
export class InvalidBucketValueError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessagesLabels.BUCKET_VALUE,
      params: {
        possibleValues: DomainRules.FLASHCARD.BUCKETS,
      },
    });
  }
}

export class InvalidFlashcardTextLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessagesLabels.FLASHCARD_TEXT_LENGTH,
      params: {
        min: DomainRules.FLASHCARD.TEXT.MIN_LENGTH,
        max: DomainRules.FLASHCARD.TEXT.MAX_LENGTH,
      },
    });
  }
}

// Activity Instruction
export class InvalidActivityOptionLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ text }) {
    super({
      errorName: ErrorMessagesLabels.ACTIVITY_OPTION_LENGTH,
      params: {
        min: DomainRules.ACTIVITY.OPTION.MIN_LENGTH,
        max: DomainRules.ACTIVITY.OPTION.MAX_LENGTH,
        text,
      },
    });
  }
}

export class InvalidInstructionOptionSetError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessagesLabels.ACTIVITY_INSTRUCTION_INVALID_OPTION_SET,
    });
  }
}

export class InvalidActivityInstructionLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ text }) {
    super({
      errorName: ErrorMessagesLabels.ACTIVITY_INSTRUCTION_LENGTH,
      params: {
        min: DomainRules.ACTIVITY.INSTRUCTION.MIN_LENGTH,
        max: DomainRules.ACTIVITY.INSTRUCTION.MAX_LENGTH,
        text,
      },
    });
  }
}

// Activity Title
export class InvalidActivityTitleLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ text }) {
    super({
      errorName: ErrorMessagesLabels.ACTIVITY_TITLE_LENGTH,
      params: {
        min: DomainRules.ACTIVITY.TITLE.MIN_LENGTH,
        max: DomainRules.ACTIVITY.TITLE.MAX_LENGTH,
        text,
      },
    });
  }
}

// Activity Description
export class InvalidActivityDescriptionLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ text }) {
    super({
      errorName: ErrorMessagesLabels.ACTIVITY_DESCRIPTION_LENGTH,
      params: {
        min: DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH,
        max: DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH,
        text,
      },
    });
  }
}

// Activity Content
export class InvalidActivityTypeError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ contentType }) {
    super({
      errorName: ErrorMessagesLabels.ACTIVITY_TYPE,
      params: {
        validTypes: DomainRules.ACTIVITY.CONTENTTYPE,
        contentType,
      },
    });
  }
}

export class InvalidVideoUrlError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessagesLabels.ACTIVITY_VIDEO_URL,
    });
  }
}

export class InvalidVideoTimesError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessagesLabels.ACTIVITY_VIDEO_TIMES,
    });
  }
}

export class InvalidVideoLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessagesLabels.ACTIVITY_VIDEO_LENGTH,
    });
  }
}

export class InvalidTextLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessagesLabels.ACTIVITY_TEXT_LENGTH,
    });
  }
}

// Activity
export class InvalidActivityTopicError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ text }) {
    super({
      errorName: ErrorMessagesLabels.ACTIVITY_TOPIC,
      params: { text },
    });
  }
}

export class InvalidActivityTimeToCompleteError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessagesLabels.ACTIVITY_TIME_TO_COMPLETE,
    });
  }
}
