import { ErrorMessages } from '..';

export default {
  [ErrorMessages.DATABASE_ERROR]:
    'Something went wrong connecting to the database.',
  [ErrorMessages.CANNOT_ALTER_THIS_USER]:
    'You do not have authorization to alter this user',
  [ErrorMessages.INVALID_CREDENTIALS]: 'Wrong e-mail or password',
  [ErrorMessages.INVALID_TOKEN]: 'Expired token. Please login again',
  [ErrorMessages.PARAMETER_NOT_PROVIDED]:
    'Some request parameter was not provided. Please refer to the documentation.',
  [ErrorMessages.USER_NOT_FOUND]: 'User not found',
  [ErrorMessages.MALFORMED_TOKEN]: 'Authentication token has wrong format',
  [ErrorMessages.MISSING_TOKEN]: 'Please provide an authentication token',
  [ErrorMessages.ACTIVITY_OPTION_LENGTH]:
    'Activity option %{text} is invalid. Option length must be between %{min} and %{max} characters long.',
  [ErrorMessages.ROUTE_NOT_FOUND]: 'Route not found',
};
