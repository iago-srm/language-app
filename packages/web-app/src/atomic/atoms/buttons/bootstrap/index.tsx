import BootstrapButton from "react-bootstrap/Button";

interface IButtonProps {
  loading?: boolean;
  buttonStyles?: any;
  onClick?: (args: any) => any;
  variant?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<IButtonProps> = (props) => {
  return <BootstrapButton {...props} />;
};
