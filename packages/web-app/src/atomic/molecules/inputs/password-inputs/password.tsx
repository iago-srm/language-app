import { BasePasswordInput } from "./base";
import { useLanguage } from "@contexts";
import { Translations, Labels } from "@locale";

export const PasswordInput = ({ ...rest }: any) => {
  const { language } = useLanguage();

  return (
    <BasePasswordInput
      {...rest}
      label={Translations[language][Labels.Auth.PASSWORD]}
      placeholder={Translations[language][Labels.Auth.PASSWORD]}
    />
  );
};
