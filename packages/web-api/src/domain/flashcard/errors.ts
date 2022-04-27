import { CustomError } from '@common/errors';
import { ErrorMessages } from '@common/locales';
import { DomainRules } from '@language-app/common';

export class InvalidBucketValueError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.INVALID_BUCKET_VALUE, params: {
      possibleValues: DomainRules.FLASHCARD.BUCKETS
    } });
  }
}

export class InvalidFlashcardTextLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.INVALID_FLASHCARD_TEXT_LENGTH, params: {
      min: DomainRules.FLASHCARD.TEXT.MIN_LENGTH,
      max: DomainRules.FLASHCARD.TEXT.MAX_LENGTH
    }});
  }
}
