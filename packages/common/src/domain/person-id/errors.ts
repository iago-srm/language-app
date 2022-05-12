import { ErrorMessages } from '../../locale';
import { CustomError } from '../../errors';

export class InvalidEmailError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.INVALID_EMAIL });
  }
}

export class InvalidNameError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessages.INVALID_NAME,
    });
  }
}
