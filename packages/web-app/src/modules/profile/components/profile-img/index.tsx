import { Icons } from "@atomic/atoms";
import styled from "styled-components";
import { cardHoverAnimationCss } from "@styles";

const ProfileImgContainerStyled = styled.div`
  margin: 0 auto;

  img {
    width: 100%;
    max-height: 400px;
    border-radius: 10px;
    object-fit: cover;
  }

  div {
    width: 80%;
    padding: 10px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colors.secondary};
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin: 10px auto;
    ${cardHoverAnimationCss}
  }
`;

export const ProfileImg = ({ src, onClick }) => {
  return (
    <ProfileImgContainerStyled>
      <img src={src} />
      <div onClick={onClick}>
        <span>Change profile picture</span>
        <Icons.EDIT />
      </div>
    </ProfileImgContainerStyled>
  );
};
