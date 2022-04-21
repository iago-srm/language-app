import { CustomError } from './custom-error';
import { ErrorMessages } from '../locales';

export class CredentialsNotProvidedError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(ErrorMessages.CREDENTIALS_NOT_PROVIDED);
  }
}

export class InvalidCredentialsError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(ErrorMessages.INVALID_CREDENTIALS);
  }
}

export class CannotAlterUserError extends CustomError {
  HTTPstatusCode = 403;
  constructor() {
    super(ErrorMessages.CANNOT_ALTER_THIS_USER);
    console.log('alter user');
  }
}

export class ParameterNotProvidedError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(ErrorMessages.PARAMETER_NOT_PROVIDED);
  }
}

export class CategoryNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super(ErrorMessages.CATEGORY_NOT_FOUND);
  }
}

export class ExtractNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super(ErrorMessages.EXTRACT_NOT_FOUND);
  }
}

export class UserNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super(ErrorMessages.USER_NOT_FOUND);
  }
}

export class MissingTokenError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(ErrorMessages.MISSING_TOKEN);
  }
}

export class MalformedTokenError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(ErrorMessages.MALFORMED_TOKEN);
  }
}
