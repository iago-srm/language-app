import styled from 'styled-components';
import { CenteringColumn } from '@styles';

const FrameStyled = styled(CenteringColumn)`
  padding: 30px;
  border-radius: 20px;
  background-color: ${p => p.theme.colors.background};
`;

export const Frame = ({children}) => {
  return (
    <FrameStyled>
      {children}
    </FrameStyled>
  )
}
