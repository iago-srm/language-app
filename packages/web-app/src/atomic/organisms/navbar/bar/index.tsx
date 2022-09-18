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
  BarAuthenticatedSectionContainer,
  DrawerAuthenticatedSectionContainer,
  LogoImageContainer
} from './styles';
import { NavbarButton } from '../buttons';
import {
  NavbarDropDown
} from '../user-dropdown';
import { 
  LanguageSelect 
} from '@atomic/molecules';
import { HamburguerButton, DrawerMenu, ModeToggle, Separator } from '@atomic';

export const Navbar = () => {

  const { mode, setMode, theme:  { responsiveBreakpoint } } = useColorTheme();

  const isBigScreen = useMediaQuery({ minWidth: responsiveBreakpoint });
  const [burguerOpen, setBurguerOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { user, isAuthenticated, signOut } = useAuth();
  const router = useRouter();

  const currentPath = router.pathname;

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

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

  const getAuthenticatedSection = (Container) => {
    if(!hasMounted) return (
      <Container></Container>
    )
    if(hasMounted && isAuthenticated) return (
      <Container>
        <NavbarButton path='/dashboard' labelName="DASHBOARD" highlighted={currentPath === '/dashboard'}/>
        <Separator />
        <NavbarDropDown user={user} onSignOut={handleSignOut} />
      </Container>
    )
    return (
      <Container>
        <NavbarButton path='/signin' labelName={"SIGNIN"} highlighted={currentPath === '/signin'}/>
        <NavbarButton path='/signup' labelName={"SIGNUP"} highlighted={currentPath === '/signup'}/>
      </Container>
    )
  }

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
            {getAuthenticatedSection(BarAuthenticatedSectionContainer)}
          </BarButtonContainer>
        </MediaQuery>
      </Container>
      {burguerOpen ? (
        <DrawerMenu>
          <ModeToggle mode={mode} setMode={setMode}/>
          <LanguageSelect onChange={setLanguage} language={language}/>
          {getAuthenticatedSection(DrawerAuthenticatedSectionContainer)}
        </DrawerMenu>
      ) : null}
    </>
  )
}