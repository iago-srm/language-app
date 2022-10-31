import styled from "styled-components";
import { cardHoverAnimationCss } from "@styles";

export const ActivityCardContainer = styled.div`
  min-width: 80%;
  max-width: 90%;
  min-height: 100px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  margin: 10px auto;
  padding: 10px;
  cursor: pointer;
  ${cardHoverAnimationCss}
  div.header {
    display: flex;
    justify-content: space-between;
  }
`;

// export const
