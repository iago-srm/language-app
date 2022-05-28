import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';
import { useColorTheme } from '@contexts';

const NavImageContainer = styled.div`
  img {
    height: 50px;
  }
`;

const PanelImageContainer = styled.div`
  width: 200px;
  text-align: center;
  padding: 20px;
`;

const PanelNameContainer = styled.div`
  padding: 15px;
`;

const DropdownMenuContainer = styled.div`
  border: 1px solid ${p => p.theme.colors.text};
`;

const NavImg = ({src}) => <img referrerPolicy="no-referrer" src={src} alt={'Imagem do Usuário'}/>

export const HoverPanel = ({ user, onLogout }) => {

  const { theme } = useColorTheme();

  return (
    <Dropdown >
      <Dropdown.Toggle style={{ backgroundColor: 'inherit', border: 'none' }}>
        <NavImageContainer>
          <NavImg src={user.image}/>
        </NavImageContainer>
      </Dropdown.Toggle>

      <Dropdown.Menu variant={theme}>
        <DropdownMenuContainer>
          <PanelImageContainer>
            <NavImg src={user.image}/>
          </PanelImageContainer>
          <PanelNameContainer>Olá, {user.name}</PanelNameContainer>
          <Dropdown.Item as={'button'}>
            <NextLink href={'/profile'}>
              Perfil
            </NextLink>
          </Dropdown.Item>
          <Dropdown.Item onClick={onLogout}>
            Sair
          </Dropdown.Item>
        </DropdownMenuContainer>
      </Dropdown.Menu>
    </Dropdown>
  )
}
