import { useRouter } from 'next/router'
import Link from "next/link";
import Image from 'next/image'
import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { useLanguage, useColorTheme, useAuth } from '@contexts';
import { Translations, Labels } from '@locale';

import {
  Navbar as NavbarAtomic,
} from './atomic/navbar';
import {
  HoverPanel
} from './hover-panel';
import { LanguageSelect } from './language-select';
import { ThemeToggle } from './theme-toggle';

const LogoImageContainer = styled.div`
  margin: 10px;
  cursor: pointer;
`;

export const Navbar = () => {
  const { mode, setMode } = useColorTheme();
  const { language, setLanguage } = useLanguage();
  const { user, isAuthenticated, signOut } = useAuth();

  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push('/')
  }
  return (
    <>
      <NavbarAtomic currentPath={router.pathname}>
        <NavbarAtomic.LeftButtons>
          <Link href={'/'}>
            <LogoImageContainer ><Image src='/images/logo.png' width={50} height={50}/></LogoImageContainer>
          </Link>
        </NavbarAtomic.LeftButtons>
        <NavbarAtomic.RightButtons>
          <ThemeToggle mode={mode} setMode={setMode}/>
          <LanguageSelect onChange={setLanguage} language={language}/>
          {user
            ?
            <>
              <NavbarAtomic.Button path='/dashboard' >
                <Link href={'/dashboard'}>
                  {Translations[language][Labels.DASHBOARD]}
                </Link>
              </NavbarAtomic.Button>
              <HoverPanel user={user} onSignOut={handleSignOut}/>
            </>
            :
            isAuthenticated < 0 &&
            <>
              <NavbarAtomic.Button path='/signin' >
                <Link href={'/signin'}>
                  {Translations[language][Labels.SIGNIN]}
                </Link>
              </NavbarAtomic.Button>
              <NavbarAtomic.Button path='/signup'>
                <Link href={'/signup'}>
                  {Translations[language][Labels.SIGNUP]}
                </Link>
              </NavbarAtomic.Button>
            </>
          }
        </NavbarAtomic.RightButtons>
      </NavbarAtomic>
    </>
  )
}
