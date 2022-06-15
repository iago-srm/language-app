import BootstrapAlert from 'react-bootstrap/Alert';
import { getChildrenOnDisplayName } from 'components/utils';

type Variant = 'success' | 'danger';

interface AlertProps {
  variant: Variant;
  onClose: () => any;
}

interface SubComponents {
  Heading: any;
  Content: any;
}

export const Alert: React.FC<AlertProps> & SubComponents = ({
  onClose,
  children,
  variant
}) => {

  const heading = getChildrenOnDisplayName(children, 'Heading');
  const content = getChildrenOnDisplayName(children, 'Content');

  return (
    <BootstrapAlert variant={variant} onClose={onClose} dismissible>
      <BootstrapAlert.Heading>{heading}</BootstrapAlert.Heading>
      <p>
        {content}
      </p>
    </BootstrapAlert>
  );
}

const Heading = ({children}) => children;
Heading.displayName = 'Heading';
Alert.Heading = Heading;

const Content = ({children}) => children;
Content.displayName = 'Content';
Alert.Content = Content;
