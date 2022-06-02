import React, { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Container } from './styles'
import { getPageTitle } from '@utils'
import { useLanguage } from '@contexts';
import { Translations, Labels } from '@locale';

const Home: React.FC = () => {
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

export default Home
