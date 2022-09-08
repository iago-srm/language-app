import styled from 'styled-components';
import React from 'react';
import { 
  barHeight,
  barBottomBorderHeight
} from './navbar.styles';

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  // backdrop-filter: blur(13px);
`;

const Container = styled.div`
  background-color: ${({theme}) => theme.colors.primary};
  width: 100%;
  position: absolute;
  top: ${barHeight};
  left: 0;
  * {
    margin: 2px 0;
  }

`;

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;

const ContentStyled = styled.div`

`;

const getChildrenOnDisplayName = (children, displayName) => React.Children.map(children, (child) => child.type.displayName === displayName ? child : null);

export const DrawerMenu = ({ children, onClose }) => {

  // const header = getChildrenOnDisplayName(children, 'Header');
  const menuItems = getChildrenOnDisplayName(children, 'Content');

    const handleOutsideClick = (e) => {
      if(e.target.id === "outside") {
          onClose();
      }
    }
    return (
      <Backdrop id="outside" onClick={handleOutsideClick}>
        <Container role='nav'>
          <Content>
            {menuItems}
          </Content>
        </Container>
      </Backdrop>
    )
}

// const Header = ({children}) => children;
// Header.displayName = 'Header';
// DrawerMenu.Header = Header;

const Content = ({children}) => children;
Content.displayName = 'Content';
DrawerMenu.Content = Content;
