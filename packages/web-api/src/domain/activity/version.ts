import { FeedbackToActivity } from "../feedback";
import { ActivityInstruction } from './instruction';
import { StudentOutput } from '../student';
import { DomainRules } from '@language-app/common';
import {
  InvalidActivityTitleLengthError,
  InvalidActivityDescriptionLengthError
} from './errors';


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
    this.validateTitle(args.title);
    this.validateDescription(args.description);
    this.title = args.title;
    this.description = args.description;
  }

  validateTitle(text) {
    if(text.length < DomainRules.ACTIVITY.TITLE.MIN_LENGTH ||
      text.length > DomainRules.ACTIVITY.TITLE.MAX_LENGTH) {
      throw new InvalidActivityTitleLengthError({
        text
      })
    }
  }

  validateDescription(text) {
    if(text.length < DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH ||
      text.length > DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH) {
      throw new InvalidActivityDescriptionLengthError({
        text
      })
    }
  }
}
