import { InvalidCEFRError } from './errors';

interface CEFRConstructorParams {
  value: string;
}

export class CEFR {
  private possibleValues = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  private value: string;

  constructor(args: CEFRConstructorParams) {
    this.validateValue(args.value);
    this.value = args.value;
  }

  validateValue(value: string) {
    if(!this.possibleValues.includes(value)) throw new InvalidCEFRError()
  }
}
