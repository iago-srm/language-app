import { IInvitationEmailService } from "@application/ports";
import { IEmailService } from '@language-app/common-platform';
import {
  Strings
} from '@common/locale';

export class AssociationInvitationEmail implements IInvitationEmailService {

  constructor(
    private emailService: IEmailService
  ) {}

  sendInvitationEmailToStudent({
    language, destination, url, instructorName
  }) {
    const strings = new Strings();
    strings.setLanguage(language);
    // console.log({strings: JSON.stringify(strings.email.ASSOCIATION_INVITATION_SUBJECT)});
    console.log(strings);
    console.log(strings.email);
    console.log(strings.email.ASSOCIATION_INVITATION_SUBJECT);
    const subject = strings.email.ASSOCIATION_INVITATION_SUBJECT(instructorName);
    console.log({subject})
    return this.emailService.sendEmail(
      destination,
      subject,
      // "teste",
      { html: strings.email.ASSOCIATION_INVITATION(url, instructorName) },
    )
  }
  
}
