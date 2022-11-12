import { ErrorMessagesLabels, CustomError } from "@language-app/common-utils";

export class InvalidEmailError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({ errorName: ErrorMessagesLabels.INVALID_EMAIL });
  }
}

export class InvalidNameError extends CustomError {
  HTTPstatusCode = 400;
  constructor() {
    super({
      errorName: ErrorMessagesLabels.INVALID_NAME,
    });
  }
}
