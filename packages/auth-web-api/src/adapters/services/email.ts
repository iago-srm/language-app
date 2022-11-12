import { IAuthEmailService } from "@application/ports";
import { IEmailService } from "@language-app/common-platform";
import { Strings } from "@common/locale";

export class AuthEmails implements IAuthEmailService {
  constructor(private emailService: IEmailService) {}

  sendForgotPasswordEmail({ destination, language, url }) {
    const strings = new Strings();
    strings.setLanguage(language);
    return this.emailService.sendEmail(
      destination,
      strings.email.FORGOT_PASSWORD_SUBJECT,
      { html: strings.email.FORGOT_PASSWORD_BODY(url) }
    );
  }

  sendVerifyAccountEmail({ destination, language, url }) {
    const strings = new Strings();
    strings.setLanguage(language);
    return this.emailService.sendEmail(
      destination,
      strings.email.VERIFY_ACCOUNT_SUBJECT,
      { html: strings.email.VERIFY_ACCOUNT_BODY(url) }
    );
  }
}
