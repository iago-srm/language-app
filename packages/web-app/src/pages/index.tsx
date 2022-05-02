import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Container } from './home-styles'

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>

      <Image src="/images/logo.jpg" width={500} height={500}/>
      <h1>Language App</h1>
    </Container>
  )
}

export default Home
