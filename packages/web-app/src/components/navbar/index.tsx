import Link from 'next/link';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import DarkModeToggle from "react-dark-mode-toggle";

import { useLanguage, useColorTheme, useAuth } from '@contexts';
import { Translations, Labels } from '@locale';

import {
  Navbar as NavbarAtomic,
  NavButton as NavButtonAtomic
} from './atomic';
import {
  HoverPanel
} from './hover-panel';

const LanguageSelectStyled = styled.select`
  height: 1.5rem;
  width: 100px;
  margin: 0 15px;
`;

const NavButton = ({path, text}) => {
  const router = useRouter();

  return (
    <NavButtonAtomic highlighted={router.pathname === path}>
      <Link href={path} >
          {text}
        </Link>
    </NavButtonAtomic>
  )
}

export const Navbar = () => {
  const { theme, setTheme } = useColorTheme();
  const { language, setLanguage } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <NavbarAtomic>
      <NavbarAtomic.LeftButtons>
        <NavButton path='/' text={Translations[language][Labels.HOME]}/>
      </NavbarAtomic.LeftButtons>
      <NavbarAtomic.RightButtons>
        <DarkModeToggle
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          checked={theme === 'dark'}
          size={80}
        />
        <LanguageSelectStyled onChange={e => setLanguage(e.target.value)} value={language}>
          <option value='fr' >Français</option>
          <option value='pt' >Português</option>
          <option value='en' >English</option>
        </LanguageSelectStyled>
        {isAuthenticated
          ?
          <>
            <HoverPanel user={user} onLogout={logout}/>
            {/* <NavButton path={'/logout'} text={Translations[language][Labels.LOGOUT]} /> */}
          </>
          :
          <>
            <NavButton path='/login' text={Translations[language][Labels.LOGIN]}/>
            <NavButton path='/signup' text={Translations[language][Labels.SIGNUP]}/>
          </>
        }
      </NavbarAtomic.RightButtons>
    </NavbarAtomic>
  )
}
