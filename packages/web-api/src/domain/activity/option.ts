import { ActivityRules } from './rules';
import { InvalidActivityOptionLengthError } from './errors';

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
    if(text.length < ActivityRules.OPTION.MIN_LENGTH ||
      text.length < ActivityRules.OPTION.MAX_LENGTH) {
      throw new InvalidActivityOptionLengthError({
        text,
        min: ActivityRules.OPTION.MIN_LENGTH,
        max: ActivityRules.OPTION.MAX_LENGTH
      })
    }
  }
}
