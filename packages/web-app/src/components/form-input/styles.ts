import styled from 'styled-components';

export const InputStyled = styled.input<{error: any}>`
  margin-bottom: 20px 0;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: ${p => p.error ? "3px solid red" : "none"};
`;

export const ErrorMessageContainer = styled.p`
  text-align: center;
  padding: 10px 0;
  margin-bottom: 2rem;
  color: ${p => p.theme.colors.error};
  font-weight: bold;
`;
