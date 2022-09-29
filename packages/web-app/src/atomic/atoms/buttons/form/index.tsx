import { ButtonStyled } from './styles';

// interface IButtonProps extends React.AllHTMLAttributes<ButtonHTMLAttributes<{}>> {}

export const FormButton = (props) => {
  return (
      <ButtonStyled type="submit" {...props} disabled={props.loading}>
      {props.loading ?
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      :
      <>{props.children}</>}
      </ButtonStyled>
  )
}