import { CustomError } from './custom-error';
import { ErrorMessagesLabels } from '../locale';

export class DatabaseError extends CustomError {
  public HTTPstatusCode = 500;

  constructor() {
    super({ errorName: ErrorMessagesLabels.DATABASE_ERROR });
    // Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
