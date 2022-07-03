type EmailBody = {
  text?: string;
  html?: string;
}

export interface IEmailService {
  sendEmail: (to: string, subject: string, body: EmailBody) => Promise<boolean>;
}
