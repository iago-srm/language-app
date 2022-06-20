import { Translations, Labels } from '@locale';
import { useLanguage, useColorTheme } from '@contexts';

import { Alert } from './alert';

export const SuccessAlert = ({response, onClose}) => {
  const { language } = useLanguage();

  return response ? <Alert onClose={onClose} variant='success'>
      <Alert.Heading>{Translations[language][Labels.SUCCESS]}</Alert.Heading>
      <Alert.Content>{response}</Alert.Content>
    </Alert> : null;
}
