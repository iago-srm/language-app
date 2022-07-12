import { ErrorMessagesLabels } from "./labels"

export interface IEmailStrings {
  'FORGOT_PASSWORD_BODY': (url: string) => string;
  'FORGOT_PASSWORD_SUBJECT': string;
  'VERIFY_ACCOUNT_BODY': (url: string) => string;
  'VERIFY_ACCOUNT_SUBJECT': string;
}

export type IErrorMessages = typeof ErrorMessagesLabels;
