import { CustomError } from '@common/errors';
import { ErrorMessages } from '@common/locales';
import { DomainRules } from '@language-app/common';

export class InvalidActivityOptionLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ text }) {
    super({
      errorName: ErrorMessages.ACTIVITY_OPTION_LENGTH,
      params: {
        min: DomainRules.ACTIVITY.OPTION.MIN_LENGTH,
        max: DomainRules.ACTIVITY.OPTION.MAX_LENGTH,
        text
      }
    });
  }
}

export class InvalidActivityInstructionLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ text }) {
    super({
      errorName: ErrorMessages.ACTIVITY_INSTRUCTION_LENGTH,
      params: {
        min: DomainRules.ACTIVITY.INSTRUCTION.MIN_LENGTH,
        max: DomainRules.ACTIVITY.INSTRUCTION.MAX_LENGTH,
        text
      }
    });
  }
}

export class InvalidActivityTitleLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ text }) {
    super({
      errorName: ErrorMessages.ACTIVITY_TITLE_LENGTH,
      params: {
        min: DomainRules.ACTIVITY.TITLE.MIN_LENGTH,
        max: DomainRules.ACTIVITY.TITLE.MAX_LENGTH,
        text
      }
    });
  }
}

export class InvalidActivityDescriptionLengthError extends CustomError {
  HTTPstatusCode = 400;
  constructor({ text }) {
    super({
      errorName: ErrorMessages.ACTIVITY_DESCRIPTION_LENGTH,
      params: {
        min: DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH,
        max: DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH,
        text
      }
    });
  }
}

export class InvalidInstructionOptionSetError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessages.ACTIVITY_INSTRUCTION_INVALID_OPTION_SET
    })
  }
}


