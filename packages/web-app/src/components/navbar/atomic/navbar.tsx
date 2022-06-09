import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { getChildrenOnDisplayName } from 'components/utils';
import {
  Container,
  BarButtonContainer,
  HamburguerButtonContainer,
  BarButtonStyled,
  SideMenuButtonStyled
} from './navbar.styles';
import { HamburguerButton } from './hamburguer';
import { SideMenu } from './side-menu';

const responsiveBreakpoint = 550;
const barHeight = '7vh';

const NavbarContext = createContext({
  currentPath: '/',
  burguerOpen: false,
  barHeight,
  closeSideMenu: () => {}
});

interface NavbarSubComponents {
  RightButtons: any,
  LeftButtons: any,
  Button: any
}

interface NavbarProps {
  currentPath: string;
}

export const Navbar: React.FunctionComponent<NavbarProps> & NavbarSubComponents = ({
  children,
  currentPath
}) => {
  const isBigScreen = useMediaQuery({ minWidth: responsiveBreakpoint });
  const [burguerOpen, setBurguerOpen] = useState(false);

  const buttonsOnRight = getChildrenOnDisplayName(children, 'RightButtons');
  const buttonsOnLeft = getChildrenOnDisplayName(children, 'LeftButtons');

  useEffect(() => {
    if(isBigScreen) setBurguerOpen(false);
  }, [isBigScreen]);

  useEffect(() => {
    setBurguerOpen(false);
  }, [currentPath]);

  return (
    <NavbarContext.Provider value={{
      currentPath,
      burguerOpen,
      barHeight,
      closeSideMenu: () => setBurguerOpen(false)
    }}>
      <Container>
        <BarButtonContainer>
          {buttonsOnLeft}
        </BarButtonContainer>
        <MediaQuery maxWidth={responsiveBreakpoint}>
          <HamburguerButtonContainer>
            <HamburguerButton open={burguerOpen} onClick={() => setBurguerOpen(open => !open)}/>
          </HamburguerButtonContainer>
        </MediaQuery>
        <MediaQuery minWidth={responsiveBreakpoint}>
          <BarButtonContainer>
            {buttonsOnRight}
          </BarButtonContainer>
        </MediaQuery>
      </Container>
      {burguerOpen ? (
        <SideMenu onClose={() => setBurguerOpen(false)}>
          <SideMenu.Header>
            {buttonsOnLeft}
          </SideMenu.Header>
          <SideMenu.Content>
            {buttonsOnRight}
          </SideMenu.Content>
        </SideMenu>
      ) : null}
    </NavbarContext.Provider>
  )
}

const RightButtons = ({children}) => children;
RightButtons.displayName = 'RightButtons';
Navbar.RightButtons = RightButtons;

const LeftButtons = ({children}) => children || null;
LeftButtons.displayName = 'LeftButtons';
Navbar.LeftButtons = LeftButtons;

const Button = ({children, path}) => {
  const { burguerOpen, currentPath, barHeight } = useContext(NavbarContext);

  const ButtonStyled = burguerOpen ? SideMenuButtonStyled : BarButtonStyled;

  return (
    <ButtonStyled barHeight={barHeight} highlighted={currentPath === path}>
      {children}
    </ButtonStyled>
  )
}
Button.displayName = 'Button';
Navbar.Button = Button;
