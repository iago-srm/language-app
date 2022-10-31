import styled from "styled-components";
import { Icons } from "@atomic/atoms";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(13px);
  z-index: 999;
`;

const ModalContainer = styled.div`
  border-radius: 10px;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px;
  min-width: 70%;
  max-width: 95%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h5 {
    margin: 0;
  }
`;

const CloseIconContainer = styled.div`
  cursor: pointer;
  padding: 5px;
`;

const ModalContent = styled.div``;

interface IModalProps {
  header?: string;
  onClose: () => any;
  children: any;
}

export const Modal = ({ children, onClose, header }: IModalProps) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === "outside") {
      onClose();
    }
  };
  return (
    <ModalBackdrop id="outside" onClick={handleOutsideClick}>
      <ModalContainer role="dialog">
        <ModalHeader>
          {header && <h5>{header}</h5>}
          <CloseIconContainer onClick={onClose} data-testid="closeButton">
            <Icons.CLOSE />
          </CloseIconContainer>
        </ModalHeader>
        <ModalContent>
          {children}
          {/* {content} */}
        </ModalContent>
      </ModalContainer>
    </ModalBackdrop>
  );
};

const Header = ({ children }) => children;
Header.displayName = "Header";
Modal.Header = Header;

const Content = ({ children }) => children;
Content.displayName = "Content";
Modal.Content = Content;
