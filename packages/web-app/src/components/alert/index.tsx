import Alert from 'react-bootstrap/Alert';
import { getChildrenOnDisplayName } from 'components/utils';

export const ErrorAlert = ({ onClose, children }) => {

  const heading = getChildrenOnDisplayName(children, 'Heading');
  const content = getChildrenOnDisplayName(children, 'Content');

  return (
    <Alert variant="danger" onClose={onClose} dismissible>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>
        {content}
      </p>
    </Alert>
  );
}

const Heading = ({children}) => children;
Heading.displayName = 'Heading';
ErrorAlert.Heading = Heading;

const Content = ({children}) => children;
Content.displayName = 'Content';
ErrorAlert.Content = Content;
