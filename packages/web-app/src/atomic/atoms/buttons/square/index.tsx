import styled from "styled-components";

export const SquareButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  cursor: pointer;
  margin: 0 3px;
`;
