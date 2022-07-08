import { Strings } from '@common/locale';

export const HeaderParser = {
  getPreferredLanguage: (req) => {
    const proposals = req.headers['x-accept-language'] || 'en;q=1'
    const [lang] = proposals.split(';')
    return Strings.GetLanguage(lang);
  }
}
