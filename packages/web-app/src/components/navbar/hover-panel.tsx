import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';

const NavImageContainer = styled.div`
  img {
    height: 60px;
  }

`;


const Link = ({ href, children }) => {
  const LinkContainer = styled.div`
    a {
      display: block;
      background-color: pink;
    }
    border: none;
  `;
  return (
    <LinkContainer>
      <NextLink href={href}>
        {children}
      </NextLink>
    </LinkContainer>
  )
}

export const HoverPanel = ({ user, onLogout }) => {
  return (
    <Dropdown >
      <Dropdown.Toggle style={{ backgroundColor: 'inherit', border: 'none' }}>
        <NavImageContainer><img src={user.image} alt="imagem usuário"/></NavImageContainer>
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <NavImageContainer><img src={user.image} alt="imagem usuário"/></NavImageContainer>
        <Dropdown.Item as={Link} href={'/profile'}>
          Perfil
        </Dropdown.Item>
        <Dropdown.Item onClick={onLogout}>
          Sair
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
