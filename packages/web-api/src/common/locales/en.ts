import { ErrorMessages } from '.';
import { EnglishErrorMessages as CommonEnglishErrorMessages} from '@language-app/common';

export default {
  ...CommonEnglishErrorMessages,
  [ErrorMessages.ACTIVITY_OPTION_LENGTH]:
    'Activity option %{text} is invalid. Option length must be between %{min} and %{max} characters long.',
};
