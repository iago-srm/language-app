import styled, { css } from 'styled-components';
import { FlexCentered } from '@styles';

export const barHeight = '10vh';
export const barBottomBorderHeight = '3px';

export const Container = styled.nav`
  width: 100%;
  background-color: ${p => p.theme.colors.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: ${barHeight};
  // overflow: hidden;
  border-bottom: ${barBottomBorderHeight} solid ${p => p.theme.colors.secondary};
`;

export const BarButtonContainer = styled(FlexCentered)`
  flex-direction: row;
  margin: 0 5px;
`;

export const DrawerButtonContainer = styled(FlexCentered)`
  margin: 0 5px;
`;


export const DrawerButtonStyled = styled.div`
`;

interface BarButtonProps {
  highlighted: boolean;
  barHeight: string;
}

const ButtonStyled = styled.div<BarButtonProps>`
  a {
    display: flex;
    height: ${({barHeight}) => barHeight};
    align-items: center;
    min-width: 120px;
    color: ${p => p.theme.colors.text};
    ${p => p.highlighted ?
    `font-weight: 900;
    ` :
    null}
    text-align: center;
    background-color: inherit;
    &:hover {
      color: ${p => p.theme.colors.highlightedText};
      background-color: ${p => p.theme.colors.highlight};
      cursor: pointer;
    }
  }
`;

export const BarButtonStyled = styled(ButtonStyled)`
  a {
    justify-content: center;
  }
`;

export const SideMenuButtonStyled = styled(ButtonStyled)`
  a {
    justify-content: start;
    padding: 0 15px;
  }
`;

export const HamburguerButtonContainer = styled(FlexCentered)`
  width: 55px;
`;

