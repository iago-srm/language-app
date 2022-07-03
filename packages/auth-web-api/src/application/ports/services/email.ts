type SendEmailArgs = {
  destination: string,
  language: string,
  url: string
}
export interface IAuthEmailService {
  sendForgotPasswordEmail: (args: SendEmailArgs) => Promise<any>;
  sendVerifyAccountEmail: (args: SendEmailArgs) => Promise<any>;
}
