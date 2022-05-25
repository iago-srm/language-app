import Link from 'next/link';
import { useRouter } from 'next/router'
import { useContext } from 'react';
import styled from 'styled-components';

import { LanguageContext } from '@contexts';
import { Translations, Labels } from '@locale';

import {
  Navbar as NavbarAtomic,
  NavButton as NavButtonAtomic
} from './atomic';

const LanguageSelectStyled = styled.select`
  height: 1.5rem;
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
  const { language, setLocale } = useContext(LanguageContext);

  return (
    <NavbarAtomic>
      <NavbarAtomic.LeftButtons>
        <NavButton path='/' text={Translations[language][Labels.HOME]}/>
      </NavbarAtomic.LeftButtons>
      <NavbarAtomic.RightButtons>
        <LanguageSelectStyled onChange={e => setLocale(e.target.value)}>
          <option value='fr-FR'>Français</option>
          <option value='pt-BR'>Português</option>
          <option value='en-US'>English</option>
        </LanguageSelectStyled>
        <NavButton path='/login' text={Translations[language][Labels.LOGIN]}/>
      </NavbarAtomic.RightButtons>
    </NavbarAtomic>
  )
}
