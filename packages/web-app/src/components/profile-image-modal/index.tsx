import { useState } from 'react';
import { Modal, Button, Toast, successToast, errorToast } from '@components';
import styled from 'styled-components';
import { useApiBuilder } from '@services/api';
import { useAuth } from '@contexts';

const ModalContentStyled = styled.div`
  img {
    display: block;
    max-width: 400px;
    max-height: 400px;
  }
  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 400px;
  }

`;

export const ProfileImageModal = ({ onClose, user }) => {

  const [selectedFile, setSelectedFile] = useState();
  const { uploadProfileImage } = useApiBuilder();
  const { refreshUser } = useAuth();

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append(
      'profile-image',
      selectedFile,
    );
    const response = await uploadProfileImage.apiCall(formData);
    if(response.error) errorToast(response.error.message);
    else {
      refreshUser();
      successToast('Imagem alterada com sucesso');
    }
  }

  return (
    <Modal onClose={onClose}>
      <ModalContentStyled>
        <h4>Escolha uma foto de perfil</h4>
        <div className='img-container'>
          <img src={(selectedFile && URL.createObjectURL(selectedFile)) || user.image}/>
        </div>
        <br/>
        <input type="file" onChange={onFileChange} accept="image/png, image/jpeg"/>
        <hr/>
        <Button onClick={onFileUpload} loading={uploadProfileImage.loading}>
          Salvar
        </Button>
      </ModalContentStyled>
      <Toast/>
    </Modal>
  )
}
