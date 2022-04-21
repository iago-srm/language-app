import { CustomError } from '@common/errors';
import { ErrorMessages } from '@common/locales';

export class InvalidCEFRError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super(ErrorMessages.INVALID_CEFR);
  }
}
