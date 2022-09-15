import styled from 'styled-components';
import { FlexCentered } from '@styles';

export const Container = styled.nav`
  width: 100%;
  background-color: ${p => p.theme.colors.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 10vh;
  border-bottom: 3px solid ${p => p.theme.colors.secondary};
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



export const HamburguerButtonContainer = styled(FlexCentered)`
  width: 55px;
`;

export const LogoImageContainer = styled.div`
  margin: 10px;
  cursor: pointer;
`;