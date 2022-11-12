import { ErrorMessagesLabels as ErrorMessages } from "./labels";

export const EnglishErrorMessages = {
  [ErrorMessages.INVALID_EMAIL]: "Invalid e-mail",
  [ErrorMessages.INVALID_NAME]: "Invalid name",
  [ErrorMessages.INVALID_PASSWORD]: "Invalid password",
  [ErrorMessages.PASSWORDS_DONT_MATCH]: "Passwords dont match",
  [ErrorMessages.ROUTE_NOT_FOUND]: "Route not found",
  [ErrorMessages.DATABASE_ERROR]:
    "Something went wrong connecting to the database.",
  [ErrorMessages.CANNOT_ALTER_THIS_USER]:
    "You do not have authorization to alter this user",
  [ErrorMessages.INVALID_TOKEN]: "Expired token. Please login again",
  [ErrorMessages.PARAMETER_NOT_PROVIDED]:
    "%{parameter} was not provided. Please refer to the documentation.",
  [ErrorMessages.USER_NOT_FOUND]: "User not found",
  [ErrorMessages.MALFORMED_TOKEN]: "Authentication token has wrong format",
  [ErrorMessages.MISSING_TOKEN]: "Please provide an authentication token",
  [ErrorMessages.INVALID_PARAMETER]:
    "Some request parameter has wrong format. Please refer to documentation",
};
