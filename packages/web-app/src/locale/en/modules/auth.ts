import { Labels as AllLabels } from "locale/labels";

const { Auth: Labels } = AllLabels;

export const Auth = {
  [Labels.NAME]: "Name",
  [Labels.EMAIL]: "E-mail",
  [Labels.PASSWORD]: "Password",
  [Labels.CONFIRM_PASSWORD]: "Confirm Password",

  [Labels.SEND]: "Send",
  [Labels.OR]: "Or",
  [Labels.FORGOT_PASSWORD_QUESTION]: "Forgot your password?",

  [Labels.AWAIT_CONFIRMATION_EMAIL]: "Please wait for a confirmation e-mail",
  [Labels.EMAIL_WILL_BE_SENT]: "An e-mail will be sent to you",
  [Labels.PASSWORD_SUCCESSFULLY_CHANGED]:
    "Your password has been changed successfully",
};
