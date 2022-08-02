import { DomainRules } from '@language-app/common';
import {
  InvalidInstructionOptionSetError,
  InvalidActivityInstructionLengthError,
  InvalidActivityOptionLengthError
} from '../errors';

interface ActivityInstructionConstructorParams {
  correctAnswer: string;
  text: string;
  options?: string[];
}

export class ActivityInstruction {
  correctAnswer: string;
  text: string;
  options?: { [key: string]: string }[];
  private _separator = '//%//';

  constructor(args: Partial<ActivityInstructionConstructorParams>) {
    args.text && this.setInstruction(args.text);
    args.options && this.parseOptions(args.options, args.correctAnswer);
    args.correctAnswer && this.setCorrectAnswer(args.correctAnswer);
  }

  setInstruction(text: string) {
    if (
      text.length < DomainRules.ACTIVITY.INSTRUCTION.MIN_LENGTH ||
      text.length > DomainRules.ACTIVITY.INSTRUCTION.MAX_LENGTH
    ) {
      throw new InvalidActivityInstructionLengthError({
        text,
      });
    }
    this.text = text;
  }

  parseOptions(options: string[], correctAnswer: string) {
    if(!correctAnswer) throw new Error('Options but no correct answer');
    for(let option of options) {
      const [letter, text] = option.split(this._separator);
      if (
        text.length < DomainRules.ACTIVITY.OPTION.MIN_LENGTH ||
        text.length > DomainRules.ACTIVITY.OPTION.MAX_LENGTH
      ) {
        throw new InvalidActivityOptionLengthError({
          text,
        });
      }
      this.options[letter] = text;
    }
    if(!options[correctAnswer]) throw new InvalidInstructionOptionSetError();
  }

  setCorrectAnswer(text: string) {
    this.correctAnswer = text;
  }
}
