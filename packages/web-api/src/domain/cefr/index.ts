import { DomainRules } from '@language-app/common';
import { InvalidCEFRError } from '../errors';

interface CEFRConstructorParams {
  value: string;
}

export class Cefr {
  value: string;

  constructor(args: CEFRConstructorParams) {
    this.setValue(args.value);
  }

  setValue(value: string) {
    if (!DomainRules.CEFR.POSSIBLE_VALUES.includes(value))
      throw new InvalidCEFRError();
    this.value = value;
  }
}
