import styled from "styled-components";

export const CheckboxFormStyled = styled.form<{ vertical: boolean }>`
  label {
    display: ${({ vertical }) => (vertical ? "block" : "inline-block")};
    padding: 3px 11px;
  }
  input {
    margin-right: 6px;
  }
  p {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 10px;
  }
`;
