import styled from "styled-components";

export const LanguageSelectContainer = styled.div`
  width: 170px;
  @media (max-width: ${({ theme }) => theme.responsiveBreakpoint}px) {
    width: 40%;
    min-width: 200px;
    padding: 5px 20px;
  }
`;
