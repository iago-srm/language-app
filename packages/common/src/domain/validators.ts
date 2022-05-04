import * as EmailValidator from 'email-validator';

export const validateEmail = EmailValidator.validate;

export const validateYoutubeUrl = (url: string) => {
  // https://stackoverflow.com/a/30795206
  return /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/.test(url);
}
