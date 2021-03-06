import React, { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

import { Container } from './styles'
import { getPageTitle } from '@services/browser';
import { useLanguage, useAuth } from '@contexts';
import { Translations, Labels } from '@locale';
import { GetServerSideProps } from 'next'
import {
  LoadingErrorData
} from '@components';

const Dashboard: React.FC = () => {
  const { language } = useLanguage();
  const { user, isUserLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(user) {
      !user?.role && router.push('/dashboard/set-role')
      user?.role === 'INSTRUCTOR' && router.push('/dashboard/instructor')
      user?.role === 'STUDENT' && router.push('/dashboard/student')
    }
  }, [user]);

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.HOME])}</title>
      </Head>

      <LoadingErrorData loading={isUserLoading} error={false} data={true}>

      </LoadingErrorData>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { 'language-app.token': token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  const payload = jwt.verify(token, process.env.NEXT_PUBLIC_AUTH_TOKEN_SECRET) as any;
  console.log({payload})

  return {
    props: {}
  }
}


export default Dashboard
