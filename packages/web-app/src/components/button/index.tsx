import React from 'react';
import { ButtonStyled } from './styles';

interface IButtonProps{
  loading: boolean;
  buttonStyles?: any;
}

export const Button: React.FC<IButtonProps> = ({loading, children}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {loading ?
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      :
      <ButtonStyled type="submit">{children}</ButtonStyled>
      }
    </div>
  )
};
