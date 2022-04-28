import { DomainRules } from '@language-app/common';
import { InvalidActivityOptionLengthError } from './errors';
import { ActivityOption } from './option';

interface ActivityInstructionConstructorParams {
  instruction: string;
  isMultiCorrect: boolean;
}

export class ActivityInstruction {
  isMultiCorrect: boolean;
  instruction: string;
  options?: ActivityOption[];

  constructor(args: ActivityInstructionConstructorParams) {
    this.validateInstruction(args.instruction);
    this.instruction = args.instruction;
    this.isMultiCorrect = args.isMultiCorrect;
  }

  validateInstruction(text: string) {
    if(text.length < DomainRules.ACTIVITY.INSTRUCTION.MIN_LENGTH ||
      text.length < DomainRules.ACTIVITY.INSTRUCTION.MAX_LENGTH) {
      throw new InvalidActivityOptionLengthError({
        text
      })
    }
  }
}
