import styled from "styled-components";
import { CEFRColors } from "@model";

const CefrStyled = styled.h5<{ cefr: string }>`
  color: ${({ cefr }) => CEFRColors[cefr]};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: inline-block;
  min-width: 36px;
`;

export const CEFRDisplay = ({ cefr }) => (
  <CefrStyled cefr={cefr}>
    {"["}
    {cefr}
    {"]"}
  </CefrStyled>
);
