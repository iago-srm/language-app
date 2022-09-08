import React, { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Container } from '../dashboard-styles'
import { getPageTitle } from '@services/browser';
import { useLanguage } from '@contexts';
import { Translations, Labels } from '@locale';

const Home: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      <h3>Área do Estudante</h3>

      <a href="/activities">Procurar Atividades</a>
    </Container>
  )
}

export default Home
