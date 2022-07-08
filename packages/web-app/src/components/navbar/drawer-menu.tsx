import React from 'react';
import styled from 'styled-components';

const DrawerMenuStyled = styled.div`
`;

const DrawerMenuItemStyled = styled.div``

export const DrawerMenu = ({ children }) => {
  return (
    <DrawerMenuStyled>
      {React.Children.map(children, child => <DrawerMenuItemStyled>{child}</DrawerMenuItemStyled>)}
    </DrawerMenuStyled>
  )
}
