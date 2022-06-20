import { Translations, Labels } from '@locale';
import { useLanguage, useColorTheme } from '@contexts';
import { Alert } from './alert';

export const ErrorAlert = ({error, onClose}) => {
  const { language } = useLanguage();

  return error ? <Alert onClose={onClose} variant='danger'>
    <Alert.Heading>{Translations[language][Labels.ERROR]}</Alert.Heading>
    <Alert.Content>{error}</Alert.Content>
  </Alert> : null;
}
