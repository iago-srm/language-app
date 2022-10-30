import styled from "styled-components";
import { FlexCentered } from "@styles";

const FrameStyled = styled(FlexCentered)`
  padding: 30px;
  border-radius: 20px;
  background-color: ${(p) => p.theme.colors.primary};
  box-shadow: 2px 2px 2px 1px ${(p) => p.theme.colors.accent},
    -2px -2px 2px 1px rgba(0, 0, 0, 0.6);
  flex-direction: column;
`;

export const Frame = ({ children }) => {
  return <FrameStyled>{children}</FrameStyled>;
};
