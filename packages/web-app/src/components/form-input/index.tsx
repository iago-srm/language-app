import React from "react";
import { InputStyled, ErrorMessageContainer } from './styles';

interface IInput extends React.AllHTMLAttributes<IInput> {
  name: string;
  register?: any;
  errors?: any;
}

export function Input({ register, name, errors, ...rest }: IInput) {
  return (
    <>
      <InputStyled {...register(name)} {...rest} error={errors[name]}/>
      <ErrorMessageContainer >{errors[name]?.message}</ErrorMessageContainer>
    </>
  )
}
