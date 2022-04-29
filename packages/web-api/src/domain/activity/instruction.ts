import { DomainRules } from '@language-app/common';
import {
  InvalidActivityInstructionLengthError,
  InvalidInstructionOptionSetError
} from '../errors';
import { ActivityOption } from './option';

interface ActivityInstructionConstructorParams {
  text: string;
  isCheckbox: boolean;
}

export class ActivityInstruction {
  isCheckbox: boolean;
  text: string;
  options?: ActivityOption[];

  constructor(args: ActivityInstructionConstructorParams) {
    this.validateInstruction(args.text);
    this.text = args.text;
    this.isCheckbox = args.isCheckbox;
  }

  validateInstruction(text: string) {
    if(text.length < DomainRules.ACTIVITY.INSTRUCTION.MIN_LENGTH ||
      text.length > DomainRules.ACTIVITY.INSTRUCTION.MAX_LENGTH) {
      throw new InvalidActivityInstructionLengthError({
        text
      })
    }
  }

  // if instruction is no checkbox type (is, therefore, radio), one and only one correct option is allowed.
  // if instruction is of type checkbox, zero or more correct options are allowed.
  addOptions(options: ActivityOption[]) {
    const providedNoCorrectOptions = options.findIndex(option => option.isCorrect) === -1;
    if(providedNoCorrectOptions && !this.isCheckbox) throw new InvalidInstructionOptionSetError();
    const providedMultipleCorrectOptions = options.filter(option => option.isCorrect).length > 1;
    if(providedMultipleCorrectOptions && !this.isCheckbox) throw new InvalidInstructionOptionSetError();
    this.options = options;
  }
}
