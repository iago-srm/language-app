import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';
import {
  Container as PageContainer,
  PStyled
} from './styles';
import { getPageTitle } from '@services/browser';
import { useLanguage, useAuth } from '@contexts';
import { Translations, Labels } from '@locale';
import {
  ProfileImg,
  LoadingErrorData,
  ProfileImageModal,
  Anchor,
  Toast
} from '@atomic';
import { ResponsiveCenteredPageContent } from '@styles';

export const Page: React.FC = () => {

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
                <ProfileImageModal onClose={() => setModalVisible(false)} image={user.image}/>
              }
              <PStyled>{user.role ? `Eu sou ${user.role}` : <Anchor href="/dashboard/set-role">Complete seu cadastro</Anchor>}</PStyled>
            </div>
          }
        </LoadingErrorData>
      </ResponsiveCenteredPageContent>
      <Toast/>

    </PageContainer>
  )
}
