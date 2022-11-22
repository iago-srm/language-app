import BootstrapAlert from "react-bootstrap/Alert";
import { getChildrenOnDisplayName } from "atomic/utils";
import { P, Heading as TypographyHeading } from "@atomic/atoms";
import { useColorTheme } from "@contexts";

type Variant = "success" | "danger";

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
  dismissible,
}) => {
  const { theme } = useColorTheme();

  const heading = getChildrenOnDisplayName(children, "Heading");
  const content = getChildrenOnDisplayName(children, "Content");

  return (
    <BootstrapAlert
      dismissible={dismissible}
      variant={variant}
      onClose={onClose}
    >
      <BootstrapAlert.Heading>
        <h3 style={{ color: "#16213E", fontWeight: 800 }}>{heading}</h3>
      </BootstrapAlert.Heading>
      <p style={{ color: "#16213E" }}>{content}</p>
    </BootstrapAlert>
  );
};

const Heading = ({ children }) => children;
Heading.displayName = "Heading";
Alert.Heading = Heading;

const Content = ({ children }) => children;
Content.displayName = "Content";
Alert.Content = Content;

export const AlertLink = ({ children, ...rest }) => (
  <BootstrapAlert.Link {...rest}>{children}</BootstrapAlert.Link>
);
