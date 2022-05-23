import * as yup from 'yup'
import { AuthRules } from '@language-app/common';
import { Translations } from '@locale';

export class ValidationSchemas {

  constructor(private language: string) {}

  private getEmailValidation() {
    return yup
    .string()
    .required(Translations[this.language].REQUIRED_FIELD)
    .email(Translations[this.language].INVALID_EMAIL);
  }

  private getPasswordValidation() {
    return yup
      .string()
      .required(Translations[this.language].REQUIRED_FIELD)
      .matches(
        AuthRules.PASSWORD_REGEX,
        Translations[this.language].INVALID_PASSWORD
      );
  }

  private getConfirmPasswordValidation() {
    return yup
    .string()
    .oneOf([yup.ref('password'), null], Translations[this.language].PASSWORD_DONT_MATCH)
  }

  getLoginSchema() {
    return yup.object().shape({
      email: this.getEmailValidation(),
      password: this.getPasswordValidation()
    })
  }

  getSignupSchema() {
    return yup.object().shape({
      email: this.getEmailValidation(),
      password: this.getPasswordValidation(),
      confirmPassword: this.getConfirmPasswordValidation(),
    })
  }
}

