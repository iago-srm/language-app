import React, { InputHTMLAttributes, SelectHTMLAttributes, useState } from "react";
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
  const isPassword = rest.type === 'password';
  const [passwordVisible, setPasswordVisible] = useState(false);
  if(rest.type === 'password') {}
  return (
    <InputLabelStyled>
      {label}
      <InputStyled
        {...register(name)}
        {...rest}
        type={isPassword ? !passwordVisible ? 'password' : 'text' : rest.type}
        placeholder={label}
        error={errors[name]}
      />
      {isPassword ?
      <label>
        Ver senha
        <input type='checkbox' checked={passwordVisible} onChange={() => setPasswordVisible(c => !c)}/>
      </label>
      :
      null}
      <ErrorMessageContainer >{errors[name]?.message}</ErrorMessageContainer>
    </InputLabelStyled>
  )
}

interface ISelect extends React.AllHTMLAttributes<SelectHTMLAttributes<{}>> {
  name: string;
  register?: any;
  errors?: any;
}

export function Select({ children, register, name, label, ...rest }: ISelect) {
  return (
    <>
      {label}
      <select
        {...register(name)}
        {...rest}
      >
        {children}
      </select>
    </>

  )
}
