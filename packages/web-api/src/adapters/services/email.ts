import { IInvitationEmailService } from "@application/ports";
import { IEmailService } from "@language-app/common-platform";
import { Strings } from "@common/locale";

export class AssociationInvitationEmail implements IInvitationEmailService {
  constructor(private emailService: IEmailService) {}

  sendInvitationEmailToStudent({ language, destination, url, instructorName }) {
    const strings = new Strings();
    strings.setLanguage(language);
    return this.emailService.sendEmail(
      destination,
      strings.email.ASSOCIATION_INVITATION_SUBJECT(instructorName),
      { html: strings.email.ASSOCIATION_INVITATION(url, instructorName) }
    );
  }
}
