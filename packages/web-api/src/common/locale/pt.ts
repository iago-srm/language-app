import { PortugueseErrorMessages as CommonPortugueseErrorMessages } from '@language-app/common';
import { ErrorMessagesLabels } from './labels';

export const PortugueseErrorMessages = {
  ...CommonPortugueseErrorMessages,
  [ErrorMessagesLabels.ACTIVITY_OPTION_LENGTH]:
    'Activity option %{text} is invalid. Option length must be between %{min} and %{max} characters long.',
};

export const PortugueseEmailStrings = {
}
