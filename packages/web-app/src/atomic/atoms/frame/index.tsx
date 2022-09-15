import styled from 'styled-components';
import { FlexCentered } from '@styles';

const FrameStyled = styled(FlexCentered)`
  padding: 30px;
  border-radius: 20px;
  background-color: ${p => p.theme.colors.primary};
  flex-direction: column;
`;

export const Frame = ({children}) => {
  return (
    <FrameStyled>
      {children}
    </FrameStyled>
  )
}
