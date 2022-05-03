import React from "react";
import { InputStyled, ErrorMessageContainer } from './styles';

interface IInput {
  name: string;
  register?: any;
  errors?: any;
  placeholder?: string;
  inputType?: "input" | "textarea";
  type?: string;
}

export function Input({ register, name, errors, inputType, ...rest }: IInput) {
  return (
    <>
      <InputStyled {...register(name)} {...rest} />
      <ErrorMessageContainer >{errors[name]?.message}</ErrorMessageContainer>
    </>
  )
}
