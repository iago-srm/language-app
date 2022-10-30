import { BasePasswordInput } from "./base";
import { useLanguage } from "@contexts";
import { Translations, Labels } from "@locale";

export const PasswordInput = ({ ...rest }: any) => {
  const { language } = useLanguage();

  return (
    <BasePasswordInput
      {...rest}
      label={Translations[language][Labels.PASSWORD]}
      placeholder={Translations[language][Labels.PASSWORD]}
    />
  );
};
