import * as EmailValidator from 'email-validator';

export const validateEmail = () => EmailValidator.validate;
