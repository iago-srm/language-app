import { CustomError } from './custom-error';
import { ErrorMessages } from '@locale';

export class CredentialsNotProvidedError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.CREDENTIALS_NOT_PROVIDED });
  }
}

export class RouteNotFoundError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.CREDENTIALS_NOT_PROVIDED });
  }
}

export class InvalidCredentialsError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.INVALID_CREDENTIALS });
  }
}

export class CannotAlterUserError extends CustomError {
  HTTPstatusCode = 403;
  constructor() {
    super({ errorName: ErrorMessages.CANNOT_ALTER_THIS_USER });
    console.log('alter user');
  }
}

export class ParameterNotProvidedError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.PARAMETER_NOT_PROVIDED });
  }
}

export class UserNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super({ errorName: ErrorMessages.USER_NOT_FOUND });
  }
}

export class MissingTokenError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.MISSING_TOKEN });
  }
}

export class MalformedTokenError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.MALFORMED_TOKEN });
  }
}