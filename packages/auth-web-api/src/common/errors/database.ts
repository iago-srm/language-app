import { CustomError } from './custom-error';
import { ErrorMessages } from '@common/locales';

export class DatabaseError extends CustomError {
    public HTTPstatusCode = 500;

    constructor() {
        super(ErrorMessages.DATABASE_ERROR);
        // Object.setPrototypeOf(this, DatabaseError.prototype);
    }
}

export class ObjectNotFoundError extends CustomError {
    public HTTPstatusCode = 404;
    constructor() {
        super('Object not found in database.');
        // Object.setPrototypeOf(this, DatabaseError.prototype);
    }
}
