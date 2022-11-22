import { SingleSelect } from "@atomic/atoms";
import { Icons } from "@atomic";
import { LanguageSelectContainer } from "./styles";

const LanguageLabels = {
  // fr: "Français",
  pt: "Português",
  en: "English",
};

export const LanguageSelect = ({ onChange, language }) => (
  <LanguageSelectContainer>
    <SingleSelect
      selectedIcon={<Icons.GLOBE />}
      onChange={(v) => onChange(v.value)}
      value={{ label: LanguageLabels[language], value: language }}
      options={["en", "pt"].map((lang) => ({
        label: LanguageLabels[lang],
        value: lang,
      }))}
    />
  </LanguageSelectContainer>
);
