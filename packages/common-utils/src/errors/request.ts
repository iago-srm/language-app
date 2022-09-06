import { CustomError } from './custom-error';
import { ErrorMessagesLabels } from '../locale';

export class RouteNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super({ errorName: ErrorMessagesLabels.ROUTE_NOT_FOUND });
  }
}

export class CannotAlterUserError extends CustomError {
  HTTPstatusCode = 403;
  constructor() {
    super({ errorName: ErrorMessagesLabels.CANNOT_ALTER_THIS_USER });
  }
}

export class ParameterNotProvidedError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ parameter }) {
    super({ 
      errorName: ErrorMessagesLabels.PARAMETER_NOT_PROVIDED, 
      params: { parameter } 
    });
  }
}

export class InvalidParameterError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ 
      errorName: ErrorMessagesLabels.INVALID_PARAMETER
    });
  }
}

export class UserNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super({ errorName: ErrorMessagesLabels.USER_NOT_FOUND });
  }
}

export class MissingTokenError extends CustomError {
  HTTPstatusCode = 403;
  constructor() {
    super({ errorName: ErrorMessagesLabels.MISSING_TOKEN });
  }
}

export class MalformedTokenError extends CustomError {
  HTTPstatusCode = 403;
  constructor() {
    super({ errorName: ErrorMessagesLabels.MALFORMED_TOKEN });
  }
}

export class Forbidden extends CustomError {
  HTTPstatusCode = 403;
  constructor() {
    super({ errorName: ErrorMessagesLabels.INVALID_TOKEN });
  }
}


