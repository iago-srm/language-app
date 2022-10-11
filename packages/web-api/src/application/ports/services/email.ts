type SendEmailArgs = {
  destination: string,
  language: string,
  url: string,
  instructorName: string
}
export interface IInvitationEmailService {
  sendInvitationEmailToStudent: (args: SendEmailArgs) => Promise<any>;
}
