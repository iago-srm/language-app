import styled from 'styled-components';

export const InputLabelStyled = styled.label`
  display: block;
  color: ${p => p.theme.colors.text};
`;

export const FormInputStyled = styled.input<{error: any}>`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
  border-radius: ${({theme}) => theme.inputBorderRadius};
  border: ${p => p.error ? "3px solid red" : "none"};
`;

export const InputStyled = styled.input<{width?: string}>`
  padding: 10px;
  border-radius: ${({theme}) => theme.inputBorderRadius};
  border: none;
  width: ${({width}) => width || "100%"};
`;

export const ErrorMessageContainer = styled.p`
  text-align: center;
  padding: 10px 0;
  color: ${p => p.theme.colors.error};
  font-weight: bold;
`;

export const SelectStyled = styled.select`
  margin: 10px;
  padding: 4px;
  border-radius: ${({theme}) => theme.inputBorderRadius};
`;
export const InputIconContainerStyled = styled.span`
  position: absolute;
  color: black;
  transform: translate(-30px,20px);
`;
