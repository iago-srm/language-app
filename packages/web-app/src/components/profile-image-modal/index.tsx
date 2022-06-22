import { useState } from 'react';
import { Modal, Button } from '@components';
import styled from 'styled-components';
import { ResponsiveCenteredPageContent } from '@styles';

const ModalContentStyled = styled.div`
  img {
    display: block;
    // margin: 0 auto;
    max-width: 400px;
    max-height: 400px;
  }
  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 400px;
    border: 1px solid white;
  }

  input {

  }
`;

export const ProfileImageModal = ({ onClose, user }) => {

  const [selectedFile, setSelectedFile] = useState();

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      user.id,
      selectedFile,
    );
    console.log(selectedFile);
  }

  return (
    <Modal onClose={onClose}>
      <ModalContentStyled>
        <h4>Escolha uma foto de perfil</h4>
        <div className='img-container'>
          <img src={(selectedFile && URL.createObjectURL(selectedFile)) || user.image}/>
        </div>
        <input type="file" onChange={onFileChange} accept="image/png, image/jpeg"/>
        <Button onClick={onFileUpload} loading={false}>
          Salvar
        </Button>
      </ModalContentStyled>
    </Modal>
  )
}
