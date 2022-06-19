import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';

import { Container as PageContainer } from './styles'
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
import { useApiBuilder } from 'services/api';

const VerifyAccount: React.FC = (props) => {

  console.log(props)
  const { language } = useLanguage();
  const { updateUser } = useApiBuilder();
  const [error, setError] = useState<string>();

  useEffect(() => {
  }, []);

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.HOME])}</title>
      </Head>

    </PageContainer>
  )
}

export default VerifyAccount

export async function getServerSideProps(ctx) {
  console.log(ctx.query)
  return {
    props: {
      cu: 7
    }
  }
}
