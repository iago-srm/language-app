import { Translations, Labels } from '@locale';
import { useLanguage, useColorTheme } from '@contexts';
import { Alert } from './alert';

export const ErrorAlert = ({error, setError}) => {
  const { language } = useLanguage();

  return error ? <Alert onClose={() => setError(undefined)} variant='danger'>
    <Alert.Heading>{Translations[language][Labels.REQUIRED_FIELD]}</Alert.Heading>
    <Alert.Content>{error}</Alert.Content>
  </Alert> : null;
}
