import { BasePasswordInput } from "./base";
import { useLanguage } from "@contexts";
import { Translations, Labels } from "@locale";

export const ConfirmPasswordInput = ({ ...rest }: any) => {
  const { language } = useLanguage();

  return (
    <BasePasswordInput
      {...rest}
      label={Translations[language][Labels.CONFIRM_PASSWORD]}
      placeholder={Translations[language][Labels.CONFIRM_PASSWORD]}
    />
  );
};
