import styled, { css } from 'styled-components';

export const FlexCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const PageContainer = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
`

export const cardHoverAnimationCss = css`
  transition: 0.5s ease-in-out;
  :hover {
    transform: scale(1.03);
  }
`;


