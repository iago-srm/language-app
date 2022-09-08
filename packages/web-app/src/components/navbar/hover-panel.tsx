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
  img {
    height: 200px;
  }
  text-align: center;
  padding: 20px;
`;

const PanelNameContainer = styled.div`
  padding: 15px;
`;

const DropdownMenuContainer = styled.div`
  button {
    padding: 0;
  }
  button a {
    padding: 0.25rem 1rem;
    display: inline-block;
    width: 100%;
  }
`;

const NavImg = ({src}) => {
  return <img referrerPolicy="no-referrer" src={src} alt={'Imagem do Usuário'}/>
}

export const HoverPanel: React.FC<{
  user?: any;
  onSignOut: () => void;
}> = ({ user, onSignOut }) => {

  const { theme } = useColorTheme();

  return (
    <Dropdown >
      <Dropdown.Toggle style={{ backgroundColor: 'inherit', border: 'none' }}>
        <NavImageContainer>
          <NavImg src={user?.image}/>
        </NavImageContainer>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ backgroundColor: theme.colors.primary }}>
        <DropdownMenuContainer>
          <PanelImageContainer>
            <NavImg src={user?.image}/>
          </PanelImageContainer>
          <PanelNameContainer>Olá, {user?.name}</PanelNameContainer>
          <Dropdown.Item as={'button'}>
            <NextLink href={'/profile'}>
              Perfil
            </NextLink>
          </Dropdown.Item>
          <Dropdown.Item onClick={onSignOut}>
            Sair
          </Dropdown.Item>
        </DropdownMenuContainer>
      </Dropdown.Menu>
    </Dropdown>
  )
}
