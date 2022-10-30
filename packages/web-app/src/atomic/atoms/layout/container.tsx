import React from "react";
import BootstrapContainer, { ContainerProps } from "react-bootstrap/Container";

export const Container: React.FC<ContainerProps> = ({ children, fluid }) => {
  return <BootstrapContainer fluid={fluid}>{children}</BootstrapContainer>;
};
