import { CustomError } from '@common/errors';
import { ErrorMessages } from '@common/locales';

export class InvalidActivityOptionLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ text, min, max }: {text: string, min: number, max: number}) {
    super({
      errorName: ErrorMessages.ACTIVITY_OPTION_LENGTH,
      params: { min, max, text }
    });
  }
}


