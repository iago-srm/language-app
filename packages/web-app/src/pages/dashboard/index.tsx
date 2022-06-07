import React, { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

import { Container } from './styles'
import { getPageTitle } from '@utils'
import { useLanguage } from '@contexts';
import { Translations, Labels } from '@locale';
import { GetServerSideProps } from 'next'

const Dashboard: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.HOME])}</title>
      </Head>

      {/* <Image src="/images/logo.jpg" width={500} height={500}/> */}
      <h1>Dashboard</h1>
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
