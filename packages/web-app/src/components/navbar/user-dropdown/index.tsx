import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import NextLink from "next/link";
import { useColorTheme } from "@contexts";
import {
  NavImageContainer,
  PanelImageContainer,
  PanelNameContainer,
  DropdownMenuContainer,
  DrawerContainer,
} from "./styles";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { NavbarButton } from "../buttons";
import { useRouter } from "next/router";

const genericImage = process.env.NEXT_PUBLIC_GENERIC_PROFILE_IMAGE;

const NavImg = ({ src }) => {
  return (
    <img
      referrerPolicy="no-referrer"
      src={src || genericImage}
      alt={"Imagem do Usuário"}
    />
  );
};

export const NavbarDropDown: React.FC<{
  user?: any;
  onSignOut: () => void;
}> = ({ user, onSignOut }) => {
  const router = useRouter();

  const {
    theme: { responsiveBreakpoint, colors },
  } = useColorTheme();
  const currentPath = router.pathname;

  return (
    <>
      <MediaQuery minWidth={responsiveBreakpoint}>
        {" "}
        {/** Big screen */}
        <Dropdown>
          <Dropdown.Toggle
            style={{
              backgroundColor: "inherit",
              border: "none",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <NavImageContainer>
              <NavImg src={user?.image} />
            </NavImageContainer>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ backgroundColor: colors.primary }}>
            <DropdownMenuContainer>
              <PanelImageContainer>
                <NavImg src={user?.image} />
              </PanelImageContainer>
              <PanelNameContainer>
                {user ? `Hello, ${user.name}` : "Hello!"}
              </PanelNameContainer>
              <Dropdown.Item as={"button"} className="profile">
                <NextLink href={"/profile"}>Profile</NextLink>
              </Dropdown.Item>
              <Dropdown.Item onClick={onSignOut} as={"button"}>
                Sign out
              </Dropdown.Item>
            </DropdownMenuContainer>
          </Dropdown.Menu>
        </Dropdown>
      </MediaQuery>
      <MediaQuery maxWidth={responsiveBreakpoint}>
        {" "}
        {/** Small screen */}
        <DrawerContainer>
          <NavImg src={user?.image} />
          <NavbarButton
            path="/profile"
            labelName="PROFILE"
            highlighted={currentPath === "/dashboard"}
          />
          <NavbarButton
            onClick={onSignOut}
            path="/"
            labelName="SIGNOUT"
            highlighted={false}
          />
        </DrawerContainer>
      </MediaQuery>
    </>
  );
};
