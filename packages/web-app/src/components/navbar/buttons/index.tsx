import Link from "next/link";
import { NavbarButtonStyled } from "./styles";
import { Translations, Labels } from "@locale";
import { useLanguage } from "@contexts";

interface NavbarButtonProps {
  onClick?: () => any;
  highlighted: boolean;
  labelName: string;
  path: string;
}

export const NavbarButton = ({
  path,
  labelName,
  highlighted,
  onClick,
}: NavbarButtonProps) => {
  const { language } = useLanguage();

  return (
    <NavbarButtonStyled highlighted={highlighted} onClick={onClick}>
      <Link href={path}>{Translations[language][Labels[labelName]]}</Link>
    </NavbarButtonStyled>
  );
};
