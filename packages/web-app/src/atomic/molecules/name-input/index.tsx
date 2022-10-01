import { Input } from '@atomic/atoms';
import { useLanguage } from '@contexts';
import { Translations, Labels } from '@locale';

export const NameInput = ({ ...rest }) => {
  const { language } = useLanguage();
    
    return (
        <Input
        {...rest}
        label={Translations[language][Labels.NAME]}
        placeholder={Translations[language][Labels.NAME]}
        canHaveErrors={true}
        />
    )
}