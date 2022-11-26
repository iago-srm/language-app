import { EnglishErrorMessages as CommonEnglishErrorMessages } from "@language-app/common-utils";
import { ErrorMessagesLabels, EmailStringsLabels } from "./labels";
import { DomainRules } from "@language-app/common-core";

export const EnglishErrorMessages = {
  ...CommonEnglishErrorMessages,
  [ErrorMessagesLabels.ACTIVITY_OPTION_LENGTH]:
    "Activity option %{text} is invalid. Option length must be between %{min} and %{max} characters long.",
  [ErrorMessagesLabels.ACTIVITY_TOPIC]: `Invalid topic %{text}. Valid topics are ${DomainRules.ACTIVITY.TOPICS}`,
  [ErrorMessagesLabels.ACTIVITY_TYPE]: `Invalid activity type %{text}. Valid types are ${DomainRules.ACTIVITY.CONTENTTYPE}`,
  [ErrorMessagesLabels.ACTIVITY_VIDEO_URL]: `Please inform a valid video url for the activity content`,
  [ErrorMessagesLabels.ACTIVITY_TITLE_LENGTH]: `%{text} is an invalid activity title. Activity title must be between %{min} and %{max} characters long`,
  [ErrorMessagesLabels.ACTIVITY_INSTRUCTION_LENGTH]: `Activity instructions must be between ${DomainRules.ACTIVITY.INSTRUCTION.MIN_LENGTH} and ${DomainRules.ACTIVITY.INSTRUCTION.MAX_LENGTH} characters long`,
  [ErrorMessagesLabels.ACTIVITY_OPTION_SET]: `Answer %{text} is not valid given the option set`,
  [ErrorMessagesLabels.CEFR]:
    "%{text} is an invalid CEFR value. Allowed values are %{possibleValues}",
  [ErrorMessagesLabels.ACTIVITY_TIME_TO_COMPLETE]: `Invalid timeToComplete. Allowed values are numbers from ${DomainRules.ACTIVITY.MIN_TIME_TO_COMPLETE} to ${DomainRules.ACTIVITY.MAX_TIME_TO_COMPLETE}, expressed as minutes`,
  [ErrorMessagesLabels.INVITATION_TOKEN_NOT_FOUND]:
    "Invitation token not found",
  [ErrorMessagesLabels.NO_STUDENT_ASSOCIATION]:
    "There is no student associated to this authorization token",
  [ErrorMessagesLabels.ASSOCIATION_DOESNT_BELONG]:
    "This invitation does not belong to this user",
  [ErrorMessagesLabels.ACTIVITY_NOT_FOUND]: "Activity not found",
  [ErrorMessagesLabels.EXISTING_ASSOCIATION]:
    "This student is already associated to another instructor. Please ask them to remove that association.",
  [ErrorMessagesLabels.INSTRUCTOR_ACTIVITY_LIST]:
    "Only students can have a list of activities (let us know if you'd like this feature as an instructor)",
};

export const EnglishEmailStrings = {
  [EmailStringsLabels.ASSOCIATION_INVITATION]: (
    url: string,
    instructorName: string
  ) => `
  <p>Click the link to associate to instructor ${instructorName}: ${url}</p>,
`,
  [EmailStringsLabels.ASSOCIATION_INVITATION_SUBJECT]: (
    instructorName: string
  ) => `You've just been invited to join ${instructorName}'s students!`,
};
