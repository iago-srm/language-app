import { CustomError } from '@language-app/common';
import { ErrorMessages } from '@common/locale';

export class InvalidRoleError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.INVALID_ROLE });
  }
}
