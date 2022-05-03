import React from 'react'
import Head from 'next/head'

import { Container } from './styles'
import { getPageTitle } from '@helpers'
import { Form, Input, Button } from '@components';
import { loginSchema } from '@helpers';

const Login: React.FC = () => {
  const handleSubmit = (data) => {
    console.log('dados',data);
  }

  return (
    <Container>
      <Head>
        <title>{getPageTitle('Entrar')}</title>
      </Head>
      <Form onSubmit={handleSubmit} schema={loginSchema}>
        <Input name='email' placeholder="E-mail" />
        <Input name='password' placeholder="Senha" type="password" />
        <Button loading={false}>Save</Button>
      </Form>
    </Container>
  )
}

export default Login
