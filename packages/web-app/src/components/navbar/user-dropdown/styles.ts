import styled from "styled-components";

export const NavImageContainer = styled.div`
  height: 100%;
  overflow: hidden;
  img {
    height: 9vh;
    width: auto;
  }
`;

export const PanelImageContainer = styled.div`
  img {
    height: 200px;
    border-radius: 100vmax;
  }
  text-align: center;
  padding: 20px;
`;

export const PanelNameContainer = styled.div`
  padding: 15px;
`;

export const DropdownMenuContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  button {
    padding: 0;
  }
  button.profile {
    padding: 0;
  }
  button.profile a {
    padding: 0.25rem 1rem;
    display: inline-block;
    width: 100%;
  }
  button {
    padding: 0.25rem 1rem;
    display: inline-block;
    width: 100%;
    color: ${({ theme }) => theme.colors.text};
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

export const DrawerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  img {
    margin: 0 auto;
    display: inline-block;
    height: 100px;
    border-radius: 100vmax;
  }
`;
