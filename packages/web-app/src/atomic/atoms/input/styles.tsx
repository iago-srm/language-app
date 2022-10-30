import styled from "styled-components";

export const InputStyled = styled.input<{ error: any }>`
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  border: ${(p) => (p.error ? "3px solid red" : "none")};
  background-color: ${(p) => p.theme.colors.secondary};
  color: ${(p) => p.theme.colors.text};
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${(p) => p.theme.colors.text};
    opacity: 0.5; /* Firefox */
  }
`;

export const ErrorMessageContainer = styled.p`
  text-align: center;
  padding: 10px 0;
  color: ${(p) => p.theme.colors.error};
  font-weight: bold;
`;

export const InputLabelStyled = styled.label`
  display: block;
  color: ${(p) => p.theme.colors.text};
`;
