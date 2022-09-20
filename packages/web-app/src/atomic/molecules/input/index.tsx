import React, { InputHTMLAttributes } from "react";
import {
  InputStyled,
  ErrorMessageContainer,
  InputLabelStyled
} from './styles';

interface IInput extends React.AllHTMLAttributes<InputHTMLAttributes<{}>> {
  register?: any;
  errors?: any;
  icon?: React.ReactElement
}
//
export function Input(args: IInput) {

  const { register, name, errors, label, icon, ...rest } = args;
  
  return (
    <InputLabelStyled>
      {label}
      <InputStyled
        {...register && register(name)}
        {...rest}
        placeholder={label || rest.placeholder}
        error={errors && errors[name]}
      />
      {icon}
      <ErrorMessageContainer >{errors && errors[name]?.message}</ErrorMessageContainer>
    </InputLabelStyled>
  )
}
