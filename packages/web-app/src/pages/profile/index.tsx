import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';

import { Container as PageContainer } from './styles';
import { getPageTitle } from '@services/browser';
import { useLanguage } from '@contexts';
import { Translations, Labels } from '@locale';
import {
  Button,
  Container,
  Row,
  Col,
  ErrorAlert,
  SuccessAlert
} from '@components';

const Profile: React.FC = () => {

  const router = useRouter();
  const { language } = useLanguage();

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.HOME])}</title>
      </Head>


    </PageContainer>
  )
}

export default Profile
