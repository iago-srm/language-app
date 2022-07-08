import { SelectStyled } from './styles';
import { SelectHTMLAttributes } from 'react';

interface ISelect extends React.AllHTMLAttributes<SelectHTMLAttributes<{}>> {
  name: string;
  register?: any;
  errors?: any;
}

export function Select({ children, register, name, label, ...rest }: ISelect) {
  return (
    <>
      {label}
      <SelectStyled
        {...register(name)}
        {...rest}
      >
        {children}
      </SelectStyled>
    </>

  )
}
