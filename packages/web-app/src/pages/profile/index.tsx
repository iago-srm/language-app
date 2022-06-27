import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';

import {
  Container as PageContainer,
  PStyled
} from './styles';
import { ProfileImg } from './profile-img';
import { getPageTitle } from '@services/browser';
import { useLanguage, useAuth } from '@contexts';
import { Translations, Labels } from '@locale';
import {
  Button,
  Container,
  Row,
  Col,
  ErrorAlert,
  SuccessAlert,
  LoadingErrorData,
  ProfileImageModal
} from '@components';
import { ResponsiveCenteredPageContent } from '@styles';

const Profile: React.FC = () => {

  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { user, isUserLoading, userError } = useAuth();
  const { language } = useLanguage();
  const [image,setImage] = useState();

  // useEffect(() => {
  //   console.log('profilePage',{user})
  //   if(user) setImage(user.image)
  // },[user]);

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.PROFILE])}</title>
      </Head>
      <ResponsiveCenteredPageContent>
        <LoadingErrorData data={user} loading={isUserLoading} error={userError}>
          {user &&
            <div>
              <PStyled>Olá, {user.name}</PStyled>
              <ProfileImg src={user.image} onClick={() => setModalVisible(true)}/>
              {modalVisible &&
                <ProfileImageModal onClose={() => setModalVisible(false)} user={user}/>
              }
              <PStyled>Eu sou {user.role}</PStyled>
            </div>
          }
        </LoadingErrorData>
      </ResponsiveCenteredPageContent>
    </PageContainer>
  )
}

export default Profile
