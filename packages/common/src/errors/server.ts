import { CustomError } from './custom-error';
import { ErrorMessagesLabels } from '../locale';

export class TokenGenerationError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ error }) {
    super({ errorName: ErrorMessagesLabels.TOKEN_GENERATION, params: { error } });
  }
}

export class DatabaseError extends CustomError {
  public HTTPstatusCode = 500;

  constructor() {
    super({ errorName: ErrorMessagesLabels.DATABASE_ERROR });
    // Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
