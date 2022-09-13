import { DomainRules } from '@language-app/common-core';
import {
  InvalidInstructionOptionSetError,
  InvalidActivityInstructionLengthError,
  InvalidActivityOptionLengthError
} from '../errors';

interface ActivityInstructionConstructorParams {
  answer: string;
  text: string;
  options?: string[];
}

export class ActivityInstruction {
  answer: string | string[];
  text: string;
  options?: { [key: string]: string }[] = [];
  private _separator = '//%//';

  constructor(args: Partial<ActivityInstructionConstructorParams>) {
    args.text && this.setInstruction(args.text);
    args.options && this.parseOptions(args.options, args.answer);
    args.answer && this.setanswer(args.answer);
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

  parseOptions(options: string[], answer: string) {
    if(!Array.isArray(options) || !options.length) throw new Error("\"options\" parameter must be a non-empty array")
    if(!answer) throw new Error('Options but no correct answer');
    const parsedOptions = [];
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
      this.options = { ...this.options, [letter]: text };
    }
    if(!Object.keys(this.options).find(option => option === answer))
      throw new InvalidInstructionOptionSetError({ text: answer });
  }

  setanswer(text: string) {
    this.answer = text;
  }
}
