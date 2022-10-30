import React from "react";
import styled from "styled-components";
import { Separator } from "../separator";

const DrawerMenuStyled = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
`;

const DrawerMenuItemStyled = styled.div``;

export const DrawerMenu = ({ children }) => {
  return (
    <DrawerMenuStyled>
      {React.Children.map(children, (child) => (
        <>
          <DrawerMenuItemStyled>{child}</DrawerMenuItemStyled>
          <Separator />
        </>
      ))}
    </DrawerMenuStyled>
  );
};
