import Link from "next/link";
import { NavbarButtonStyled } from "./styles";
import { Translations, Labels } from "@locale";
import { useLanguage } from "@contexts";

export const NavbarButton = ({ path, labelName, highlighted }) => {
  const { language } = useLanguage();

  return (
    <NavbarButtonStyled highlighted={highlighted}>
      <Link href={path}>{Translations[language][Labels[labelName]]}</Link>
    </NavbarButtonStyled>
  );
};
