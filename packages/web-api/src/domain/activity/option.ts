import { DomainRules } from '@language-app/common';
import { InvalidActivityOptionLengthError } from '../errors';

interface ActivityOptionConstructorParams {
  text: string;
  isCorrect: boolean;
}

export class ActivityOption {
  text: string;
  isCorrect: boolean;

  constructor(args: ActivityOptionConstructorParams) {
    this.validateOption(args.text);
    this.text = args.text;
    this.isCorrect = args.isCorrect;
  }

  validateOption(text: string) {
    if(text.length < DomainRules.ACTIVITY.OPTION.MIN_LENGTH ||
      text.length > DomainRules.ACTIVITY.OPTION.MAX_LENGTH) {
      throw new InvalidActivityOptionLengthError({
        text
      })
    }
  }
}
