import { CustomError } from '@common/errors';
import { ErrorMessages } from '@common/locales';

export class InvalidEmailError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(ErrorMessages.INVALID_EMAIL);
  }
}

export class InvalidNameError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(ErrorMessages.INVALID_NAME);
  }
}
