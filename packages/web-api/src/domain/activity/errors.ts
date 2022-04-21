import { CustomError } from '@common/errors';
import { ErrorMessages } from '@common/locales';

export class ShortActivityOptionLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ text, length }: {text: string, length: number}) {
    super({
      errorName: ErrorMessages.ACTIVITY_OPTION_SHORT,
      params: { length, text }
    });
  }
}
