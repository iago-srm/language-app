import { CustomError } from './custom-error';
import { ErrorMessages } from '@common/locales';

export class DatabaseError extends CustomError {
  public HTTPstatusCode = 500;

  constructor() {
    super({ errorName: ErrorMessages.DATABASE_ERROR });
    // Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
