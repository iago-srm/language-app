import styled, { css } from 'styled-components';


  const ButtonStyled = styled.div`
    a {
      display: flex;
      height: 100%;
      align-items: center;
      min-width: 120px;
      color: ${p => p.theme.colors.accent};
      text-align: center;
      background-color: inherit;
      &:hover {
        color: ${p => p.theme.colors.accent};
        background-color: ${p => p.theme.colors.secondary};
        cursor: pointer;
      }
    }
  `;

  interface BarButtonProps {
    highlighted: boolean;
  }
  
  export const BarButtonStyled = styled(ButtonStyled)<BarButtonProps>`
    a {
      justify-content: center;
      ${p => p.highlighted ?
        `font-weight: 900;
        ` :
        null}
    }
  `;
  
  export const DrawerMenuButtonStyled = styled(ButtonStyled)`
    a {
      justify-content: start;
      padding: 0 15px;
    }
  `;