import styled from 'styled-components';
import React from 'react';

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
  backdrop-filter: blur(13px);
`;

const Container = styled.div`
  border-radius: 10px;
  border: 1px solid black;
  background-color: ${({theme}) => theme.colors.background};
  width: 80%;
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

export const SideMenu = ({ children, onClose }) => {

  const header = getChildrenOnDisplayName(children, 'Header');
  const menuItems = getChildrenOnDisplayName(children, 'Content');

    const handleOutsideClick = (e) => {
      if(e.target.id === "outside") {
          onClose();
      }
    }
    return (
      <Backdrop id="outside" onClick={handleOutsideClick}>
        <Container role='nav'>
          <HeaderStyled>
            {header}
          </HeaderStyled>
          <Content>
            {menuItems}
          </Content>
        </Container>
      </Backdrop>
    )
}

const Header = ({children}) => children;
Header.displayName = 'Header';
SideMenu.Header = Header;

const Content = ({children}) => children;
Content.displayName = 'Content';
SideMenu.Content = Content;
