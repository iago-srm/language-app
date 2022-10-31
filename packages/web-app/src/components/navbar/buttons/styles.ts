import styled, { css } from "styled-components";

interface NavbarButtonProps {
  highlighted: boolean;
}
export const NavbarButtonStyled = styled.div<NavbarButtonProps>`
  color: ${(p) => p.theme.colors.text};

  // large screens
  @media (min-width: ${({ theme }) => theme.responsiveBreakpoint}px) {
    margin: 0 auto;
    a {
      display: flex;
      height: 100%;
      align-items: center;
      min-width: 120px;
      text-align: center;
      background-color: inherit;
      &:hover {
        background-color: ${(p) => p.theme.colors.secondary};
        cursor: pointer;
      }
      justify-content: center;
      ${(p) =>
        p.highlighted
          ? `font-weight: 900;
        `
          : null}
    }
  }

  // small screens:
  @media (max-width: ${({ theme }) => theme.responsiveBreakpoint}px) {
    width: 90%;
    margin: 0 auto;
    a {
      &:hover {
        background-color: ${(p) => p.theme.colors.secondary};
        cursor: pointer;
      }
      justify-content: start;
      padding: 15px;
      display: inline-block;
      width: 100%;
    }
  }
`;

// export const BarButtonStyled = styled(ButtonStyled)<BarButtonProps>`
//   a {

//   }
// `;

// export const DrawerMenuButtonStyled = styled(ButtonStyled)`

// `;
