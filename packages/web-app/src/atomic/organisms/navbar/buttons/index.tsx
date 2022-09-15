import Link from "next/link";
import {
    BarButtonStyled,
    DrawerMenuButtonStyled
  } from './styles';
import { Translations, Labels } from '@locale';
import { useLanguage } from '@contexts';

export const DrawerButton = ({ path, labelName }) => {
  const { language } = useLanguage();

    return (
        <DrawerMenuButtonStyled >
            <Link href={path}>
                {Translations[language][Labels[labelName]]}
            </Link>
        </DrawerMenuButtonStyled>
      )
}
export const BarButton = ({ path, labelName, highlighted }) => {
    const { language } = useLanguage();
  
    return (
      <BarButtonStyled highlighted={highlighted}>
        <Link href={path}>
            {Translations[language][Labels[labelName]]}
        </Link>
      </BarButtonStyled>
    )
  }