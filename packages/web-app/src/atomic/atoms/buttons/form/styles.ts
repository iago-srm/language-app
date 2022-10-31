import styled from "styled-components";

export const ButtonStyled = styled.button`
  width: 100%;
  display: block;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 40px;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: inset 0px 0px 0px 3px ${({ theme }) => theme.colors.secondary};
  }
  :disabled {
    cursor: not-allowed;
  }
`;
