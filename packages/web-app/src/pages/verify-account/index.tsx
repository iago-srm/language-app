import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { ResponsiveCenteredPageContent } from '@styles';

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
} from '@atomic';
import { useApiBuilder } from 'services/api';

interface IVerifyAccountProps {
  verificationToken: string;
}

const VerifyAccount: React.FC<IVerifyAccountProps> = ({ verificationToken }) => {

  const { language } = useLanguage();
  const { verifyAccount } = useApiBuilder();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      const { error } = await verifyAccount.apiCall({
        token: verificationToken,
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
        <ResponsiveCenteredPageContent>
          <SuccessAlert dismissible={false} response={success && <p>Conta verificada com sucesso! <AlertLink href='/signin'>Entrar</AlertLink></p>}/>
          <ErrorAlert dismissible={false} error={error}/>
        </ResponsiveCenteredPageContent>
    </PageContainer>
  )
}

export default VerifyAccount

export async function getServerSideProps(ctx) {
  return {
    props: {...ctx.query}
  }
}
