import {
  FeedbackToActivity,
  ActivityInstruction,
  StudentOutput,
} from '@domain';
import { DomainRules } from '@language-app/common';
import {
  InvalidActivityTitleLengthError,
  InvalidActivityDescriptionLengthError,
} from '../errors';

interface ActivityVersionConstructorParams {
  title: string;
  description: string;
}

export class ActivityVersion {
  title: string;
  description: string;

  feedbacks: FeedbackToActivity[];
  instructions: ActivityInstruction[];
  studentOutputs: StudentOutput[];

  constructor(args: ActivityVersionConstructorParams) {
    this.setTitle(args.title);
    this.setDescription(args.description);
  }

  setTitle(text) {
    if (
      text.length < DomainRules.ACTIVITY.TITLE.MIN_LENGTH ||
      text.length > DomainRules.ACTIVITY.TITLE.MAX_LENGTH
    ) {
      throw new InvalidActivityTitleLengthError({
        text,
      });
    }
    this.title = text;
  }

  setDescription(text) {
    if (
      text.length < DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH ||
      text.length > DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH
    ) {
      throw new InvalidActivityDescriptionLengthError({
        text,
      });
    }
    this.description = text;
  }
}
