export * from './labels';
import { EnglishErrorMessages, EnglishEmailStrings } from './en';
import { PortugueseErrorMessages, PortugueseEmailStrings } from './pt';
import { IEmailStrings, IErrorMessages } from './types';

const EmailStrings = {
  en: EnglishEmailStrings,
  pt: PortugueseEmailStrings
}

const ErrorStrings = {
  en: EnglishErrorMessages,
  pt: PortugueseErrorMessages
}

const availableLanguages = ['en', 'pt'];

export class Strings {

  public error: IErrorMessages;
  public email: IEmailStrings;

  constructor(l: string) {
    const language = Strings.GetLanguage(l);
    this.error = ErrorStrings[language];
    this.email = EmailStrings[language]
  }

  static GetLanguage(language: string) {
    if(!availableLanguages.includes(language)) return 'en';
    return language;
  }

}
