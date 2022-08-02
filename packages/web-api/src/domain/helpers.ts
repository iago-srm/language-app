import { DomainRules } from '@language-app/common';
import {
  InvalidTextLengthError,
  InvalidVideoUrlError
} from './errors';

export const contentValidator = {
  TEXT: (text: string) => {
    if (text.length < DomainRules.ACTIVITY.MAX_TEXT_LENGTH) return true;
    throw new InvalidTextLengthError();
  },
  VIDEO: (url: string) => {
    if(url.startsWith('https://')) return true; //TODO
    throw new InvalidVideoUrlError();
  }
}
