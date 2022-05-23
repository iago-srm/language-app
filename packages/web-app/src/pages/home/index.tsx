import React, { useEffect, useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Container } from './styles'
import { getPageTitle } from '@utils'
import { LanguageContext } from '@contexts';

const Home: React.FC = () => {
  const { setLanguage } = useContext(LanguageContext);

  useEffect(() => {
    setLanguage('fr-FR');
  }, []);
  return (
    <Container>
      <Head>
        <title>{getPageTitle('Home')}</title>
      </Head>

      <Image src="/images/logo.jpg" width={500} height={500}/>
      <h1>Language App</h1>
    </Container>
  )
}

export default Home
