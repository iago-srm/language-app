import React, {
  useEffect,
  useState
} from 'react';
import { useRouter } from 'next/router'
import Link from "next/link";
import Image from 'next/image'
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { useLanguage, useColorTheme, useAuth } from '@contexts';
import {
  Container,
  BarButtonContainer,
  HamburguerButtonContainer,
  LogoImageContainer
} from './styles';
import { BarButton, DrawerButton } from '../buttons';
import {
  NavbarDropDown
} from '../user-dropdown';
import { 
  LanguageSelect 
} from '@atomic/molecules';
import { HamburguerButton, DrawerMenu, ModeToggle } from '@atomic/atoms';

const responsiveBreakpoint = 550;

export const Navbar = () => {

  const isBigScreen = useMediaQuery({ minWidth: responsiveBreakpoint });
  const [burguerOpen, setBurguerOpen] = useState(false);
  const { mode, setMode } = useColorTheme();
  const { language, setLanguage } = useLanguage();
  const { user, isAuthenticated, signOut } = useAuth();
  const router = useRouter();

  const currentPath = router.pathname;

  const handleSignOut = () => {
    signOut();
    router.push('/')
  }

  useEffect(() => {
    if(isBigScreen) setBurguerOpen(false);
  }, [isBigScreen]);

  useEffect(() => {
    setBurguerOpen(false);
  }, [currentPath]);

  return (
    <>
      <Container>
        <BarButtonContainer>
          <Link href={'/'}>
            <LogoImageContainer ><Image src='/images/logo.png' width={50} height={50}/></LogoImageContainer>
          </Link>
        </BarButtonContainer>
        <MediaQuery maxWidth={responsiveBreakpoint}> {/** Small screen */}
          <HamburguerButtonContainer>
            <HamburguerButton open={burguerOpen} onClick={() => setBurguerOpen(open => !open)}/>
          </HamburguerButtonContainer>
        </MediaQuery>
        <MediaQuery minWidth={responsiveBreakpoint}> {/** Big screen */}
          <BarButtonContainer>
            <ModeToggle mode={mode} setMode={setMode}/>
            <LanguageSelect onChange={setLanguage} language={language}/>
            {user
              ?
              <>
                <BarButton path='/dashboard' labelName="DASHBOARD" highlighted={currentPath === '/dashboard'}/>
                <NavbarDropDown user={user} onSignOut={handleSignOut} />
              </>
              :
              isAuthenticated < 0 &&
              <>
                <BarButton path='/signin' labelName={"SIGNIN"} highlighted={currentPath === '/signin'}/>
                <BarButton path='/signup' labelName={"SIGNUP"} highlighted={currentPath === '/signup'}/>
              </>
            }
          </BarButtonContainer>
        </MediaQuery>
      </Container>
      {burguerOpen ? (
        <DrawerMenu>
          <ModeToggle mode={mode} setMode={setMode}/>
          <LanguageSelect onChange={setLanguage} language={language}/>
          <DrawerButton path='/signin' labelName={"SIGNIN"} />
          <DrawerButton path='/signup' labelName={"SIGNUP"} />
        </DrawerMenu>
      ) : null}
    </>
  )
}
