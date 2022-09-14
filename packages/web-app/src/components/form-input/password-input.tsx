import React, { InputHTMLAttributes, useState } from "react";
import {
  InputStyled,
  ErrorMessageContainer,
  InputLabelStyled,
  InputIconContainerStyled
} from './styles';
import { Icons } from '@components';

interface IInput extends React.AllHTMLAttributes<InputHTMLAttributes<{}>> {
  name: string;
  register?: any;
  errors?: any;
}

export function PasswordInput({ register, name, errors, label, ...rest }: IInput) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <InputLabelStyled>
      {label}
      <InputStyled
        {...register(name)}
        {...rest}
        type={passwordVisible ? 'text' : 'password'}
        placeholder={label}
        error={errors[name]}
      />
      <InputIconContainerStyled onClick={() => setPasswordVisible(c => !c)}>
        <i>{passwordVisible ? <Icons.CANSEE /> : <Icons.CANTSEE />}</i>
      </InputIconContainerStyled>
      <ErrorMessageContainer >{errors[name]?.message}</ErrorMessageContainer>
    </InputLabelStyled>
  )
}

