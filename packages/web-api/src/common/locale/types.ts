import { ErrorMessagesLabels } from "./labels";

export interface IEmailStrings {
  ASSOCIATION_INVITATION_SUBJECT: (instructorName: string) => string;
  ASSOCIATION_INVITATION: (url: string, instructorName: string) => string;
}

export type IErrorMessages = typeof ErrorMessagesLabels;
