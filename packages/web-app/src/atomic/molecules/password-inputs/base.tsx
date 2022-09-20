import { useState } from "react";
import { Icons, InputIcon } from '@atomic/atoms';
import { Input } from '@atomic/molecules';

export const BasePasswordInput = ({ label, placeholder, ...rest }) => {
    
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <Input
        {...rest}
        label={label}
        type={passwordVisible ? 'text' : 'password'}
        placeholder={placeholder}
        icon={<InputIcon onClick={() => setPasswordVisible(c => !c)} icon={passwordVisible ? <Icons.CAN_SEE /> : <Icons.CANT_SEE />}/>}
        />
    )
}