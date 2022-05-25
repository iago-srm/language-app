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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonStyled = styled.div<{highlighted: boolean}>`
  a {
    color: ${p => p.theme.colors.text};
    ${p => p.highlighted ?
    `font-weight: 900;
    border: 1px solid white;
    ` :
    null}

    display: inline-block;
    padding: 3vh;
    &:hover {
      color: ${p => p.theme.colors.highlightedText};
      background-color: ${p => p.theme.colors.highlight};
      cursor: pointer;
    }
    height: 8vh;
  }

`;
