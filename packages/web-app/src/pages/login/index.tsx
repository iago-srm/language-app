import React, { useEffect } from 'react'
import Head from 'next/head'
import { signIn } from "next-auth/react";
import GoogleButton from 'react-google-button';

import { Translations, Labels } from '@locale';
import { Container as LoginContainer } from './styles'
import { ValidationSchemas, getPageTitle } from '@utils';
import { useLanguage, useAuth, useColorTheme } from '@contexts';
import {
  Form,
  Input,
  Button,
  Frame,
  Container,
  Row,
  Col
} from '@components';

const LoginPage: React.FC = () => {

  const { language } = useLanguage();
  const { theme } = useColorTheme();
  const { login, loginError, loginLoading } = useAuth();

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

  const googleSignIn = () => {
    signIn("google", { callbackUrl: '/'});
  };
  return (
    <LoginContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.LOGIN])}</title>
      </Head>
      <Container fluid="sm">
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Frame>
              <Form onSubmit={handleSubmit} schema={loginSchema}>
                <Input name='email' label={Translations[language][Labels.EMAIL]} />
                <Input name='password' label={Translations[language][Labels.PASSWORD]} type="password" />
                <Button loading={loginLoading}>{Translations[language][Labels.LOGIN]}</Button>
              </Form>
              <hr/>
              <GoogleButton type={theme} onClick={googleSignIn}>Entrar com Google</GoogleButton>
            </Frame>
          </Col>
        </Row>
      </Container>
    </LoginContainer>
  )
}

export default LoginPage
