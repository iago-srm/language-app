import { ButtonStyled } from "./styles";

// interface IButtonProps extends React.AllHTMLAttributes<ButtonHTMLAttributes<{}>> {}

interface IFormButtonProps {
  loading?: boolean;
  onClick?: any;
  children: any;
  variant?: string;
  disabled?: boolean;
}
export const FormButton = ({
  loading,
  children,
  disabled,
  ...rest
}: IFormButtonProps) => {
  return (
    <ButtonStyled type="submit" {...rest} disabled={loading || disabled}>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>{children}</>
      )}
    </ButtonStyled>
  );
};
