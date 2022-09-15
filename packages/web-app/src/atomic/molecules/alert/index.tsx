import BootstrapAlert from 'react-bootstrap/Alert';
import { getChildrenOnDisplayName } from 'components/utils';
import {
  P
} from '@atomic/atoms';

type Variant = 'success' | 'danger';

export interface AlertProps {
  variant?: Variant;
  onClose?: () => any;
  dismissible?: boolean;
}

interface SubComponents {
  Heading: any;
  Content: any;
}

export const Alert: React.FC<AlertProps> & SubComponents = ({
  onClose,
  children,
  variant,
  dismissible
}) => {

  const heading = getChildrenOnDisplayName(children, 'Heading');
  const content = getChildrenOnDisplayName(children, 'Content');

  return (
    <BootstrapAlert dismissible={dismissible} variant={variant} onClose={onClose}>
      <BootstrapAlert.Heading>{heading}</BootstrapAlert.Heading>
      <P>
        {content}
      </P>
    </BootstrapAlert>
  );
}

const Heading = ({children}) => children;
Heading.displayName = 'Heading';
Alert.Heading = Heading;

const Content = ({children}) => children;
Content.displayName = 'Content';
Alert.Content = Content;

export const AlertLink = ({ children, ...rest }) => <BootstrapAlert.Link {...rest}>{children}</BootstrapAlert.Link>
