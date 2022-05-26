import Link from "next/link";
import { Container, ButtonStyled, ButtonContainer } from './styles';
import React from 'react';

const getChildrenOnDisplayName = (children, displayName) => {
  return React.Children.map(children, (child) => child.type.displayName === displayName ? child : null)
}
export const Navbar: React.FunctionComponent<{}> & { RightButtons: any, LeftButtons: any } = ({children}) => {

  const buttonsOnRight = getChildrenOnDisplayName(children, 'RightButtons');
  const buttonsOnLeft = getChildrenOnDisplayName(children, 'LeftButtons');

  return (
    <Container>
      <ButtonContainer>
        {buttonsOnLeft}
      </ButtonContainer>
      <ButtonContainer>
        {buttonsOnRight}
      </ButtonContainer>
      {/* <div>Teste</div> */}
    </Container>
  )
}

const RightButtons = ({children}) => children;
RightButtons.displayName = 'RightButtons';
Navbar.RightButtons = RightButtons;

const LeftButtons = ({children}) => children;
LeftButtons.displayName = 'LeftButtons';
Navbar.LeftButtons = LeftButtons;

export const NavButton = ({children, highlighted}) => {
  return (
    <ButtonStyled highlighted={highlighted}>
      {children}
    </ButtonStyled>
  )
}
