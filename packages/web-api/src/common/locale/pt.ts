import { PortugueseErrorMessages as CommonPortugueseErrorMessages } from "@language-app/common-utils";
import { ErrorMessagesLabels, EmailStringsLabels } from "./labels";

export const PortugueseErrorMessages = {
  ...CommonPortugueseErrorMessages,
  [ErrorMessagesLabels.ACTIVITY_OPTION_LENGTH]:
    "Activity option %{text} is invalid. Option length must be between %{min} and %{max} characters long.",
};

export const PortugueseEmailStrings = {
  [EmailStringsLabels.ASSOCIATION_INVITATION]: (
    url: string,
    instructorName: string
  ) => `
  <p>Clique no link para se associar ao instrutor ${instructorName}: ${url}</p>,
`,
  [EmailStringsLabels.ASSOCIATION_INVITATION_SUBJECT]: (
    instructorName: string
  ) =>
    `Você acaba de ser convidado para se juntar aos estudantes de ${instructorName}!`,
};
