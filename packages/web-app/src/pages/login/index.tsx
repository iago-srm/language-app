import React, { useEffect } from 'react'
import Head from 'next/head'

import { Container } from './styles'
import { ValidationSchemas, getPageTitle } from '@utils';
import { LanguageContext, AuthContext } from '@contexts';
import {
  Form,
  Input,
  Button
} from '@components';

const LoginPage: React.FC = () => {

  const { language } = React.useContext(LanguageContext);

  const { login, loginError, loginLoading } = React.useContext(AuthContext);

  const loginSchema = React.useMemo(() => {
    return new ValidationSchemas(language).getLoginSchema()
  }, [language]);

  useEffect(() => {
    if(loginError) alert(loginError.message);
  }, [loginError]);

  const handleSubmit = async (data) => {
    const resp = await login({
      email: data.email,
      password: data.password
    });
    console.log(resp)
  }

  return (
    <Container>
      <Head>
        <title>{getPageTitle('Entrar')}</title>
      </Head>
      <Form onSubmit={handleSubmit} schema={loginSchema}>
        <Input name='email' placeholder="E-mail" />
        <Input name='password' placeholder="Senha" type="password" />
        <Button loading={loginLoading}>Save</Button>
      </Form>
    </Container>
  )
}

export default LoginPage
