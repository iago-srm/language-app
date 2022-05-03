import Link from "next/link";
import { Container, Button } from './styles';
import { useRouter } from "next/router";
import React from 'react';
import { AuthContext } from '../../contexts/auth';

export const Navbar = ({children}) => {

  const { isAuthenticated } = React.useContext(AuthContext);

  const [buttons, setButtons] = React.useState({
    regularButtons: [],
    loggedOutButtons: [],
    loggedInButtons: []
  });

 React.useEffect(() => {

    const regularButtons = [];
    const loggedOutButtons = [];
    const loggedInButtons = [];

    const insertButtonsIntoStateArray = (navChild, array) => {
      navChild.props.children.length ?
      navChild.props.children.forEach(button => array.push(button))
      : array.push(navChild.props.children);
    }

    React.Children.map(children, (child) => {
      switch(child.type.name) {
        case "Button":
          regularButtons.push(child);
          break;
        case "LoggedOutButtons":
          insertButtonsIntoStateArray(child, loggedOutButtons);
          break;
        case "LoggedInButtons":
          insertButtonsIntoStateArray(child, loggedInButtons);
          break;
      }
    });

    setButtons({
      regularButtons,
      loggedOutButtons,
      loggedInButtons
    });
  }, []);

  const renderButton = (button, i) => <Navbar.NavButton key={i}>{button.props.children}</Navbar.NavButton>;
  return (
    <Container>
      {buttons.regularButtons.map(renderButton)}
      {isAuthenticated ? buttons.loggedInButtons.map(renderButton) : buttons.loggedOutButtons.map(renderButton)}
    </Container>
  )
}

const ButtonGroup = ({children}) => children;
Navbar.ButtonGroup = ButtonGroup;

interface IButtonProps {
  path?: string;
  children: any
}
// const Button = ({path, children}: IButtonProps) => {
//   const router = useRouter();
//   const navbuttonClass = (buttonRef) => `${router.pathname == buttonRef ? styles.activeButton : ""} ${styles.button}`

//   return (
//     <li className={navbuttonClass(path)}>
//       {path ? <Link href={path}>{children}</Link> : <Link href="#">{children}</Link>}
//     </li>
//   )
// }
Navbar.NavButton = Button;

const LoggedOutButtons = (props) => props;
Navbar.LoggedOut = LoggedOutButtons;

const LoggedInButtons = (props) => props;
Navbar.LoggedIn = LoggedInButtons
