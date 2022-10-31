import { Translations, Labels } from "@locale";
import { useLanguage, useColorTheme } from "@contexts";
import { Alert, AlertProps } from "@atomic/molecules";

interface SucceessAlertProps extends AlertProps {
  response: any;
}

export const SuccessAlert: React.FC<SucceessAlertProps> = ({
  response,
  onClose,
  ...rest
}) => {
  const { language } = useLanguage();

  return response ? (
    <Alert {...rest} onClose={onClose} variant="success">
      <Alert.Heading>{Translations[language][Labels.SUCCESS]}</Alert.Heading>
      <Alert.Content>{response}</Alert.Content>
    </Alert>
  ) : null;
};
