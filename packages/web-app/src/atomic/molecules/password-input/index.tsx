import React, { InputHTMLAttributes, useState } from "react";
import { Icons, InputIcon } from '@atomic/atoms';
import { Input } from '@atomic/molecules';

interface IInput extends React.AllHTMLAttributes<InputHTMLAttributes<{}>> {
  name: string;
  register?: any;
  errors?: any;
}

export function PasswordInput({ register, errors, ...rest }: IInput) {
  
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    return (
        <>
      <Input
        {...register("password")}
        {...rest}
        type={passwordVisible ? 'text' : 'password'}
        placeholder={'Senha'}
        error={errors.password}
      />
    <InputIcon onClick={() => setPasswordVisible(c => !c)} icon={passwordVisible ? <Icons.CAN_SEE /> : <Icons.CANT_SEE />}/>
    </>
  )
}

