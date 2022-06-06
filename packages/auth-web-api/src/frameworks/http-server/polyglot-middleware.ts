import Polyglot from 'node-polyglot';
import { Languages } from '@language-app/common';

const deflt = 'en';

const getPreferredLanguage = (proposals) => {
  const [lang, quality] = proposals.split(';')
  if(Languages.includes(lang)) return lang;
  return deflt;
}

export const startPolyglot = (messages) => {
  return (req, _, next) => {
    const language = getPreferredLanguage(req.headers['x-accept-language'] || 'en;q=1');
    req.polyglot = new Polyglot();
    // does not work:
    // req.headers['content-language'] = locale;
    // console.log({language})
    req.polyglot.extend(messages[language]);

    // for (let lang in messages) {
    //   if (locale.split('-')[0] === lang) {
    //     req.polyglot.extend(messages[lang]);
    //   }
    // }
    next();
  };
};
