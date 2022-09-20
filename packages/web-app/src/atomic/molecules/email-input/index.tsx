import { Input } from '@atomic/atoms';
import { useLanguage } from '@contexts';
import { Translations, Labels } from '@locale';

export const EmailInput = ({ ...rest }) => {
  const { language } = useLanguage();
    
    return (
        <Input
        {...rest}
        label={Translations[language][Labels.EMAIL]}
        placeholder={Translations[language][Labels.EMAIL]}
        canHaveErrors={true}
        />
    )
}