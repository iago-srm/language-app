import sgMail from '@sendgrid/mail';
import { IEmailService } from '@adapters/ports';

export class SendgridEmailService implements IEmailService {

  private sendgrid = sgMail;
  constructor(){
    this.sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(to: string, subject: string, { text, html }) {
    const msg = {
      to,
      from: 'iago.monteiro@usp.br',
      subject,
      text,
      html,
    }
    try {
      await this.sendgrid.send(msg);
      return true;
    } catch(e) {
      return false;
    }
  }
}

