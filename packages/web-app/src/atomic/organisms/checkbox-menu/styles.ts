import styled from "styled-components";

export const CheckboxFormStyled = styled.form<{ vertical: boolean }>`
  label {
    display: ${({ vertical }) => (vertical ? "block" : "inline-block")};
    padding: 3px 11px;
  }
  .correct {
    background-color: #83f28fcc;
    border-radius: 3px;
    border: 1px solid green;
    margin-bottom: 5px;
  }
  input {
    margin-right: 6px;
  }
  p {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 10px;
  }
`;
