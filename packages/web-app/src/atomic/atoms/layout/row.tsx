import React from "react";
import BootstrapRow, { RowProps } from "react-bootstrap/Row";

export const Row: React.FC<RowProps> = ({ children, ...rest }) => {
  return <BootstrapRow {...rest}>{children}</BootstrapRow>;
};
