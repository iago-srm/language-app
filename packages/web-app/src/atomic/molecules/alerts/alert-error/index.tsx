import { Translations, Labels } from '@locale';
import { useLanguage, useColorTheme } from '@contexts';
import { Alert, AlertProps } from '@atomic/molecules';

interface ErrorAlertProps extends AlertProps {
  error: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose, ...rest }) => {
  const { language } = useLanguage();

  return error ? <Alert {...rest} onClose={onClose} variant='danger'>
    <Alert.Heading>
      {Translations[language][Labels.ERROR]}
    </Alert.Heading>
    <Alert.Content>{error}</Alert.Content>
  </Alert> : null;
}
