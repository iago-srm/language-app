import { ActivityRules } from './rules';
import { ShortActivityOptionLengthError } from './errors';

interface ActivityOptionConstructorParams {
  text: string;
  isCorrect: boolean;
}

export class ActivityOption {
  private text: string;
  private isCorrect: boolean;

  constructor(args: ActivityOptionConstructorParams) {
    this.validateOption(args.text);
    this.text = args.text;
    this.isCorrect = args.isCorrect;
  }

  validateOption(text: string) {
    if(text.length < ActivityRules.OPTION.MIN_LENGTH) {
      throw new ShortActivityOptionLengthError({text, length: ActivityRules.OPTION.MIN_LENGTH})
    }
    if(text.length < ActivityRules.OPTION.MAX_LENGTH) {
        throw {}

    }
  }
}
