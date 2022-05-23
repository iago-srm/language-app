import Polyglot from 'node-polyglot';

const availableLocales = ['en-US', 'pt-BR'];
const defaultLocale = 'en-US';

const getPreferredLocale = (proposals) => {
  const langAndQuality = proposals.map(p => {
    const [lang, quality] = p.split(';')
    return { lang, quality: quality || 1 }
  });
  const sortedByPreference = langAndQuality.sort((a,b) => a.quality - b.quality).map(p => p.lang);
  for(let lang of sortedByPreference) {
    if(availableLocales.includes(lang)) return lang;
  }
  return defaultLocale;
}
export const startPolyglot = (messages) => {
  return (req, _, next) => {
    const proposals = req.headers['accept-language'].split(',');
    const locale = getPreferredLocale(proposals);
    req.polyglot = new Polyglot();
    // does not work:
    req.headers['content-language'] = locale;
    for (let lang in messages) {
      if (locale.split('-')[0] === lang) {
        req.polyglot.extend(messages[lang]);
      }
    }
    next();
  };
};
