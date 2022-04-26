import { CustomError } from '@common/errors';
import { ErrorMessages } from '@common/locales';
import { DomainRules } from '@language-app/common';

export class InvalidCEFRError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.INVALID_CEFR, params: {
      possibleValues: DomainRules.CEFR.POSSIBLE_VALUES
    } });
  }
}
