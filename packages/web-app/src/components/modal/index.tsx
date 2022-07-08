import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const ModalBackdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(13px);
`;

const ModalContainer = styled.div`
  border-radius: 10px;
  border: 1px solid black;
  background-color: ${({theme}) => theme.colors.background};
  padding: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const CloseIconContainer = styled.div`
  padding: 10px;
  :hover {
    cursor: pointer;
  }
`;

const ModalContent = styled.div`

`;

export const Modal = ({ children, onClose }) => {

  const handleOutsideClick = (e) => {
      if(e.target.id === "outside") {
          onClose();
      }
  }
  return (
      <ModalBackdrop id="outside" onClick={handleOutsideClick}>
          <ModalContainer role='dialog'>
              <ModalHeader>
                  <CloseIconContainer onClick={onClose} data-testid="closeButton">
                      <FontAwesomeIcon icon={faTimes}/>
                  </CloseIconContainer>
              </ModalHeader>
              <ModalContent>
                  {children}
              </ModalContent>
          </ModalContainer>
      </ModalBackdrop>
  )
}
