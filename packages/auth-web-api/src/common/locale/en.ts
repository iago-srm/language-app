import { ErrorMessages } from '.';
import { EnglishErrorMessages as CommonEnglishErrorMessages } from '@language-app/common';

export const EnglishErrorMessages = {
  ...CommonEnglishErrorMessages,
  [ErrorMessages.INVALID_ROLE]: 'Invalid role',
  [ErrorMessages.EMAIL_IN_USE]: 'There is already an account with that e-mail'
};
