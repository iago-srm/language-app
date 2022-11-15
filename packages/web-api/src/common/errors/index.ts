import { CustomError } from "@language-app/common-utils";
import { ErrorMessagesLabels } from "../locale/labels";

export class PasswordsDontMatchError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessagesLabels.PASSWORDS_DONT_MATCH });
  }
}

export class InvalidRoleError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessagesLabels.INVALID_ROLE });
  }
}

export class InvalidPasswordError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessagesLabels.INVALID_PASSWORD });
  }
}

export class UserNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super({ errorName: ErrorMessagesLabels.USER_NOT_FOUND });
  }
}

export class InvitationTokenNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super({ errorName: ErrorMessagesLabels.INVITATION_TOKEN_NOT_FOUND });
  }
}

export class NoStudentAssociationError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super({ errorName: ErrorMessagesLabels.NO_STUDENT_ASSOCIATION });
  }
}

export class AssociationDoesNotBelongToUserError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super({ errorName: ErrorMessagesLabels.NO_STUDENT_ASSOCIATION });
  }
}

export class ActivityNotFoundError extends CustomError {
  HTTPstatusCode = 404;
  constructor() {
    super({ errorName: ErrorMessagesLabels.ACTIVITY_NOT_FOUND });
  }
}

export class StudentAlreadyAssociatedError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessagesLabels.ACTIVITY_NOT_FOUND });
  }
}
