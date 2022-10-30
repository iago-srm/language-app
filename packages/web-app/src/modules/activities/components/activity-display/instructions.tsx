import styled from "styled-components";
import { Accordion } from "@atomic";

const InstructionsContainerStyled = styled.div`
  padding: 20px;
`;

export const InstructionsContainer = ({ children }) => {
  return (
    <InstructionsContainerStyled>
      <Accordion.Wrapper>{children}</Accordion.Wrapper>
    </InstructionsContainerStyled>
  );
};
