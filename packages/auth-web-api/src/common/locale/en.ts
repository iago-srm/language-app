import { EmailStringsLabels, ErrorMessagesLabels } from "./labels";
import { EnglishErrorMessages as CommonEnglishErrorMessages } from "@language-app/common-utils";

export const EnglishErrorMessages = {
  ...CommonEnglishErrorMessages,
  [ErrorMessagesLabels.INVALID_CREDENTIALS]: "Wrong e-mail or password",
  [ErrorMessagesLabels.INVALID_ROLE]: "Invalid role",
  [ErrorMessagesLabels.EMAIL_IN_USE]:
    "There is already an account with that e-mail",
  [ErrorMessagesLabels.TOKEN_GENERATION]:
    "There was an error generating the token: %{error}",
  [ErrorMessagesLabels.UNVERIFIED_USER]:
    "Univerified e-mail. Please follow the link sent to %{email}",
  [ErrorMessagesLabels.VALIDATION_TOKEN]:
    "Invalid verification token. Please sign up again.",
};

export const EnglishEmailStrings = {
  [EmailStringsLabels.FORGOT_PASSWORD_SUBJECT]:
    "Reset you password on language-app",
  [EmailStringsLabels.FORGOT_PASSWORD_BODY]: (url: string) => `
    <p>Click the link to reset your password: ${url}</p>
    <p>If you do not wish to reset your password, ignore this message.</p>
  `,
  [EmailStringsLabels.VERIFY_ACCOUNT_SUBJECT]:
    "Verify your account at language-app",
  [EmailStringsLabels.VERIFY_ACCOUNT_BODY]: (url: string) =>
    `<p>Click the link to verify your account: ${url}</p>`,
};
