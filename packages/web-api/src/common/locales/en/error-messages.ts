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
  [ErrorMessages.EXTRACT_NOT_FOUND]: 'Extract not found',
  [ErrorMessages.CATEGORY_NOT_FOUND]: 'Category not found',
  [ErrorMessages.USER_NOT_FOUND]: 'User not found',
  [ErrorMessages.MALFORMED_TOKEN]: 'Authentication token has wrong format',
  [ErrorMessages.MISSING_TOKEN]: 'Please provide an authentication token',
};
