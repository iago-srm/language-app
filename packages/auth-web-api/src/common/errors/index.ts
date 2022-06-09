import { CustomError } from '@language-app/common';
import { ErrorMessages } from '../locale/error-messages';

export class PasswordsDontMatchError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.PASSWORDS_DONT_MATCH });
  }
}

export class InvalidRoleError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.INVALID_ROLE });
  }
}

export class InvalidPasswordError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.INVALID_PASSWORD });
  }
}

export class EmailAlreadySignedupError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.EMAIL_IN_USE });
  }
}

export class TokenGenerationError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ error }) {
    super({ errorName: ErrorMessages.TOKEN_GENERATION, params: { error } });
  }
}

export class UserNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super({ errorName: ErrorMessages.USER_NOT_FOUND });
  }
}

export class InvalidValidationTokenError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.VALIDATION_TOKEN });
  }
}
