import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const ProfileImgStyled = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;

  img {
    max-width: 500px;
    border-radius: 10px;
    max-height: 400px;
  }

  div {
    background-color: white;
    cursor: pointer;
    padding: 15px;
    border-radius: 50%;
    position: absolute;
    top: 83%;
    left: 85%;
    border: 1px solid black;
    svg {
      color: black;
    }
  }

`;

export const ProfileImg = ({ src, onClick }) => {
  return (
    <ProfileImgStyled>
      <img src={src}/>
      <div onClick={onClick}><FontAwesomeIcon icon={faPencil}/></div>
    </ProfileImgStyled>
  )
}
