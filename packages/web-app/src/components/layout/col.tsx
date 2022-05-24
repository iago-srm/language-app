import React from 'react';
import BootstrapCol, { ColProps } from 'react-bootstrap/Col';

export const Col: React.FC<ColProps> = ({
  children,
  ...rest
}) => {
  return (
    <BootstrapCol {...rest} >
      {children}
    </BootstrapCol>
  )
}
