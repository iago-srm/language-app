import { CustomError } from '@common/errors';
import { ErrorMessages } from '@common/locales';
import { DomainRules } from '@language-app/common';

export class InvalidEmailError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.INVALID_EMAIL });
  }
}

export class InvalidNameError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.INVALID_NAME, params: {
      min: DomainRules.PERSONID.NAME.MIN_LENGTH,
      max: DomainRules.PERSONID.NAME.MAX_LENGTH
    }});
  }
}
