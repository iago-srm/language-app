import styled from 'styled-components';

export const Container = styled.nav`
  width: 100vw;
  background-color: ${p => p.theme.colors.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 2px solid ${p => p.theme.colors.secondary};
`;

export const ButtonContainer = styled.div`
`;

export const ButtonStyled = styled.div`
  a {
    color: ${p => p.theme.colors.text};
    display: inline-block;
    padding: 3vh;
    &:hover {
      color: ${p => p.theme.colors.highlightedText};
      background-color: ${p => p.theme.colors.background};
      cursor: pointer;
    }
    height: 8vh;
  }

`;
