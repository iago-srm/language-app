import React, { InputHTMLAttributes } from "react";
import {
  InputStyled,
  ErrorMessageContainer,
  InputLabelStyled
} from './styles';

interface IInput extends React.AllHTMLAttributes<InputHTMLAttributes<{}>> {
  name: string;
  register?: any;
  errors?: any;
}

export function Input({ register, name, errors, label, ...rest }: IInput) {
  return (
    <InputLabelStyled>
      {label}
      <InputStyled
        {...register(name)}
        {...rest}
        placeholder={label}
        error={errors[name]}
      />
      <ErrorMessageContainer >{errors[name]?.message}</ErrorMessageContainer>
    </InputLabelStyled>
  )
}
