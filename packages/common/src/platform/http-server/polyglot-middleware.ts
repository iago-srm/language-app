import Polyglot from 'node-polyglot';
import { HeaderParser } from './headers';

export const startPolyglot = (strings: any) => {
  return (req, _, next) => {
    const language = HeaderParser.getPreferredLanguage(req);
    req.polyglot = new Polyglot();
    strings.setLanguage(language);
    req.polyglot.extend(strings.error);
    next();
  };
};
