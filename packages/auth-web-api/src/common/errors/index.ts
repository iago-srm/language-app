import { CustomError, ErrorMessages } from '@language-app/common';
import { ErrorMessages as LocalErrorMessages } from '../locale/error-messages';

export class PasswordsDontMatchError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.PASSWORDS_DONT_MATCH });
  }
}

export class InvalidRoleError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: LocalErrorMessages.INVALID_ROLE });
  }
}

export class InvalidPasswordError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.INVALID_PASSWORD });
  }
}
