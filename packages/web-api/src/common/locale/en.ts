import { 
  EnglishErrorMessages as CommonEnglishErrorMessages 
} from '@language-app/common-utils';
import { ErrorMessagesLabels } from './labels';
import { DomainRules } from '@language-app/common-core';


export const EnglishErrorMessages = {
  ...CommonEnglishErrorMessages,
  [ErrorMessagesLabels.ACTIVITY_OPTION_LENGTH]:
    'Activity option %{text} is invalid. Option length must be between %{min} and %{max} characters long.',
  [ErrorMessagesLabels.ACTIVITY_TOPIC]: `Invalid topic %{text}. Valid topics are ${DomainRules.ACTIVITY.TOPICS}`,
  [ErrorMessagesLabels.ACTIVITY_TYPE]: `Invalid activity type %{text}. Valid types are ${DomainRules.ACTIVITY.CONTENTTYPE}`,
  [ErrorMessagesLabels.ACTIVITY_VIDEO_URL]: `Please inform a valid video url for the activity content`,
  [ErrorMessagesLabels.ACTIVITY_TITLE_LENGTH]: `%{text} is an invalid activity title. Activity title must be between %{min} and %{max} characters long`,
  [ErrorMessagesLabels.ACTIVITY_INSTRUCTION_LENGTH]: `Activity instructions must be between ${DomainRules.ACTIVITY.INSTRUCTION.MIN_LENGTH} and ${DomainRules.ACTIVITY.INSTRUCTION.MAX_LENGTH} characters long`,
  [ErrorMessagesLabels.ACTIVITY_OPTION_SET]: `Answer %{text} is not valid given the option set`,
  [ErrorMessagesLabels.CEFR]: "%{text} is an invalid CEFR value. Allowed values are %{possibleValues}",
  [ErrorMessagesLabels.ACTIVITY_TIME_TO_COMPLETE]: `Invalid timeToComplete. Allowed values are numbers from ${DomainRules.ACTIVITY.MIN_TIME_TO_COMPLETE} to ${DomainRules.ACTIVITY.MAX_TIME_TO_COMPLETE}, expressed as minutes`


};

export const EnglishEmailStrings = {
}
