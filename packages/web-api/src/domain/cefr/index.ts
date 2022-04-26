import { DomainRules } from '@language-app/common';
import { InvalidCEFRError } from './errors';

interface CEFRConstructorParams {
  value: string;
}

export class Cefr {
  value: string;

  constructor(args: CEFRConstructorParams) {
    this.validateValue(args.value);
    this.value = args.value;
  }

  validateValue(value: string) {
    if(!DomainRules.CEFR.POSSIBLE_VALUES.includes(value)) throw new InvalidCEFRError()
  }
}
