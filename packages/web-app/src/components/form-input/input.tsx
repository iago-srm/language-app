import React, { InputHTMLAttributes } from "react";
import {
  FormInputStyled,
  ErrorMessageContainer,
  InputLabelStyled
} from './styles';

interface IInput extends React.AllHTMLAttributes<InputHTMLAttributes<{}>> {
  name?: string;
  register?: any;
  errors?: any;
}

export function Input({ register, name, errors, label, ...rest }: IInput) {
  return (
    <InputLabelStyled>
      {label}
      <FormInputStyled
        {...register && register(name)}
        {...rest}
        placeholder={label}
        error={errors && errors[name]}
      />
      <ErrorMessageContainer >{errors && errors[name]?.message}</ErrorMessageContainer>
    </InputLabelStyled>
  )
}
