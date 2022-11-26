import styled from "styled-components";
import { cardHoverAnimationCss } from "@styles";

export const DashboardButtonStyled = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  a {
    width: 100%;

    .icon-name {
      overflow: hidden;
      display: flex;
      flex-direction: row;
      justify-content: start;
      svg {
        font-size: 3rem;
        padding: 20px;
      }
      .heading-container {
        display: flex;
        align-items: center;
        h3 {
          padding: 10px 20px 10px 20px;
          margin: 0;
          text-align: center;
        }
      }
    }
    p {
      // background-color: pink;
      text-align: start;
      padding: 5px 25px;
      font-style: italic;
    }
  }
  ${cardHoverAnimationCss}
  width: 100%;
`;
