import styled from 'styled-components';

export const InputStyled = styled.input`
  margin-bottom: 20px 0;
  width: 100%;
  padding: 10px;
`;

export const ErrorMessageContainer = styled.p`
  text-align: center;
  padding: 10px 0;
  margin-bottom: 2rem;
  color: ${p => p.theme.colors.error};
  font-weight: bold;
`;
