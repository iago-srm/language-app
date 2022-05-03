import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Container } from './styles'
import { getPageTitle } from '@helpers'

const Home: React.FC = () => {
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
