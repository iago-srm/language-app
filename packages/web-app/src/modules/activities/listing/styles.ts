import styled from "styled-components";
import { cardHoverAnimationCss } from "@styles";

import { PageContainer } from "@styles";

export const Container = styled.div`
  .button-container button {
    border-radius: 3px;
    padding: 10px;
    border: none;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    margin: 20px 0;
    ${cardHoverAnimationCss}
  }
  .button-container button:disabled {
    color: grey;
    cursor: not-allowed;
  }
  .button-container {
    width: 100%;
    text-align: center;
  }
`;
