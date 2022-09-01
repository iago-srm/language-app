import { CustomError } from '@language-app/common';
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


export class UserNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super({ errorName: ErrorMessagesLabels.USER_NOT_FOUND });
  }
}




