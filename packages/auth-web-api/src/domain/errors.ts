import { CustomError } from '@language-app/common';

export class InvalidRoleError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessages.STUDENT_OUTPUT_FEEDBACK_STATUS });
  }
}
