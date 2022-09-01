import { CustomError } from '@language-app/common-utils';
import { ErrorMessagesLabels } from '../locale/labels';

export class PasswordsDontMatchError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessagesLabels.PASSWORDS_DONT_MATCH });
  }
}

export class InvalidRoleError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessagesLabels.INVALID_ROLE });
  }
}

export class InvalidPasswordError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessagesLabels.INVALID_PASSWORD });
  }
}

export class EmailAlreadySignedupError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessagesLabels.EMAIL_IN_USE });
  }
}

export class UserNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super({ errorName: ErrorMessagesLabels.USER_NOT_FOUND });
  }
}

export class InvalidValidationTokenError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessagesLabels.VALIDATION_TOKEN });
  }
}

export class UserNotVerifiedError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ email }) {
    super({ errorName: ErrorMessagesLabels.UNVERIFIED_USER, params: { email } });
  }
}

export class InvalidCredentialsError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessagesLabels.INVALID_CREDENTIALS });
  }
}

export class CredentialsNotProvidedError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessagesLabels.CREDENTIALS_NOT_PROVIDED });
  }
}

