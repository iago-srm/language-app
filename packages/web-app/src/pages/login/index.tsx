import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import GoogleButton from 'react-google-button';

import { Translations, Labels } from '@locale';
import { Container as LoginContainer, ErrorContainer } from './styles'
import { ValidationSchemas, getPageTitle } from '@utils';
import { useLanguage, useAuth, useColorTheme, useApi } from '@contexts';
import {
  Form,
  Input,
  PasswordInput,
  Button,
  Frame,
  Container,
  Row,
  Col
} from '@components';
import { useApiCallCustom } from "@api";

const LoginPage: React.FC = () => {

  const { language } = useLanguage();
  const { theme } = useColorTheme();
  const {
    googleSignIn,
    credentialsSignIn,
  } = useAuth();
  const [error, setError] = useState();
  const {
    apiCall: signIn,
    loading: signInLoading,
    error: signInError
  } = useApiCallCustom(credentialsSignIn);

  const loginSchema = React.useMemo(() => {
    return new ValidationSchemas(language).getLoginSchema()
  }, [language]);

  useEffect(() => {
    if(signInError) alert(signInError);
  }, [signInError]);

  const handleSubmit = async (data) => {
    await signIn(data);
  }

  return (
    <LoginContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.LOGIN])}</title>
      </Head>
      <Container fluid="sm">
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Frame>
              <ErrorContainer>{error}</ErrorContainer>
              <Form onSubmit={handleSubmit} schema={loginSchema}>
                <Input name='email' label={Translations[language][Labels.EMAIL]} />
                <PasswordInput name='password' label={Translations[language][Labels.PASSWORD]} type="password" />
                <Button loading={signInLoading}>{Translations[language][Labels.LOGIN]}</Button>
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
