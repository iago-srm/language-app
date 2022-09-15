import { SingleSelect } from '@atomic/atoms';

const LanguageLabels = {
  fr: "Français",
  pt: "Português",
  en: "English"
}

export const LanguageSelect = ({ onChange, language }) => (

  <SingleSelect 
    onChange={(v) => onChange(v.value)}
    value={{ label: LanguageLabels[language], value: language }}
    options={["fr", "en", "pt"].map(lang => (
      { label: LanguageLabels[lang], value: lang }
    ))}
  />
)
