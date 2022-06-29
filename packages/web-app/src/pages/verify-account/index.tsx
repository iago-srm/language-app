import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import Link from "next/link";
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
  SuccessAlert,
  AlertLink
} from '@components';
import { useApiBuilder } from 'services/api';

interface IVerifyAccountProps {
  verificationToken: string;
  userId: string;
}
const VerifyAccount: React.FC<IVerifyAccountProps> = ({ verificationToken, userId }) => {

  const { language } = useLanguage();
  const { verifyAccount } = useApiBuilder();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      const { error } = await verifyAccount.apiCall({
        token: verificationToken,
        userId
      });
      if(error) setError(error.message);
      else setSuccess(true);
    };
    fetch();
  }, []);

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.VERIFYACCOUNT])}</title>
      </Head>
      <Container fluid="sm" >
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <SuccessAlert dismissible={false} response={success && <p>Conta verificada com sucesso! <AlertLink href='/signin'>Entrar</AlertLink></p>}/>
            <ErrorAlert dismissible={false} error={error}/>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  )
}

export default VerifyAccount

export async function getServerSideProps(ctx) {
  return {
    props: {...ctx.query}
  }
}
