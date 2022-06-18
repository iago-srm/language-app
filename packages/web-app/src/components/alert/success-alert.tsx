import { Translations, Labels } from '@locale';
import { useLanguage, useColorTheme } from '@contexts';

import { Alert } from './alert';

export const SuccessAlert = ({response, setResponse}) => {
  const { language } = useLanguage();

  return response ? <Alert onClose={() => setResponse(undefined)} variant='success'>
      <Alert.Heading>{Translations[language][Labels.REQUIRED_FIELD]}</Alert.Heading>
      <Alert.Content>{response}</Alert.Content>
    </Alert> : null;
}
