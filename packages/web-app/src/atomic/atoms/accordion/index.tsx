import BootstrapAccordion from "react-bootstrap/Accordion";

export const Accordion = () => {};

const Wrapper = ({ children }) => (
  <BootstrapAccordion defaultActiveKey={"0"} alwaysOpen>
    {children}
  </BootstrapAccordion>
);
Accordion.Wrapper = Wrapper;

const Item = ({ children, eventKey }) => (
  <BootstrapAccordion.Item eventKey={eventKey}>
    {children}
  </BootstrapAccordion.Item>
);
Accordion.Item = Item;
