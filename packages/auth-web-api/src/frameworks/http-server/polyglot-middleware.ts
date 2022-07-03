import Polyglot from 'node-polyglot';
import { Strings } from '@common/locale';
import { HeaderParser } from './headers';

export const startPolyglot = () => {
  return (req, _, next) => {
    const language = HeaderParser.getPreferredLanguage(req);
    req.polyglot = new Polyglot();
    const strings = new Strings(language);
    req.polyglot.extend(strings.error);
    next();
  };
};
