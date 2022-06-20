import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';

import { Container as PageContainer } from './styles';
import { getPageTitle } from '@services/browser';
// import { useApiBuilder } from '@services/api';
import { useLanguage, useAuth } from '@contexts';
import { Translations, Labels } from '@locale';
import {
  Button,
  Container,
  Row,
  Col,
  ErrorAlert,
  SuccessAlert,
  LoadingErrorData
} from '@components';

const Profile: React.FC = () => {

  const router = useRouter();
  const { user, isUserLoading, userError } = useAuth();
  const { language } = useLanguage();

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.PROFILE])}</title>
      </Head>
      <LoadingErrorData data={user} loading={isUserLoading} error={userError}>
        {user &&
        <div>
          <p>Olá, {user.name}</p>
          <img src={user.image} />
          Eu sou {user.role}
        </div>
        }

      </LoadingErrorData>

    </PageContainer>
  )
}

export default Profile
