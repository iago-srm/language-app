import { EnglishErrorMessages as CommonEnglishErrorMessages } from '@language-app/common';
import { ErrorMessagesLabels } from './labels';

export const EnglishErrorMessages = {
  ...CommonEnglishErrorMessages,
  [ErrorMessagesLabels.ACTIVITY_OPTION_LENGTH]:
    'Activity option %{text} is invalid. Option length must be between %{min} and %{max} characters long.',
};

export const EnglishEmailStrings = {
}
