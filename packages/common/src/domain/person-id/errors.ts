import { ErrorMessages } from '@locale';
import { CustomError } from '@errors';
import { DomainRules } from '@language-app/common';

export class InvalidEmailError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.EMAIL });
  }
}

export class InvalidNameError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessages.NAME,
      params: {
        min: DomainRules.PERSONID.NAME.MIN_LENGTH,
        max: DomainRules.PERSONID.NAME.MAX_LENGTH,
      },
    });
  }
}
