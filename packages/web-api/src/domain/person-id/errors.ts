import { CustomError } from '@common/errors';
import { ErrorMessages } from '@common/locales';

export class InvalidEmailError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.INVALID_EMAIL });
  }
}

export class InvalidNameError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ min, max }) {
    super({ errorName: ErrorMessages.INVALID_NAME, params: { min, max }});
  }
}
