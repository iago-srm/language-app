import React, { useState } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import GoogleButton from 'react-google-button';
import { useSWRConfig } from 'swr';

import { Translations, Labels } from '@locale';
import { Container as PageContainer } from './styles'
import { getPageTitle } from '@services/browser';
import { ValidationSchemas } from '@services/validations';
import { useLanguage, useAuth, useColorTheme } from '@contexts';
import {
  Form,
  Input,
  PasswordInput,
  Button,
  Frame,
  Container,
  Row,
  Col,
  Alert
} from '@components';

const LoginPage: React.FC = () => {

  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { language } = useLanguage();
  const { theme } = useColorTheme();
  const {
    googleSignIn,
    credentialsSignIn: {
      apiCall: credentialsSignIn,
      loading
    },
  } = useAuth();
  const [error, setError] = useState("");

  const loginSchema = React.useMemo(() => {
    return new ValidationSchemas(language).getLoginSchema()
  }, [language]);

  const handleSubmit = async ({
    email,
    password,
  }) => {
    const { error } = await credentialsSignIn({
      email,
      password,
    });
    if(error) {
      setError(error.message)
    }
    if(!error) {
      mutate('user');
      router.push('/dashboard');
    }
  }

  const handleGoogleSignIn = async () => {
    await googleSignIn();
  }

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.LOGIN])}</title>
      </Head>
      <Container fluid="sm" style={{marginTop: '20px'}}>
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Frame>
              {error && <Alert onClose={() => setError(undefined)} variant='danger'>
                <Alert.Heading>Houve um erro</Alert.Heading>
                <Alert.Content>{error}</Alert.Content>
              </Alert>}
              <Form onSubmit={handleSubmit} schema={loginSchema}>
                <Input name='email' label={Translations[language][Labels.EMAIL]} />
                <PasswordInput name='password' label={Translations[language][Labels.PASSWORD]} type="password" />
                <Button loading={loading}>{Translations[language][Labels.LOGIN]}</Button>
              </Form>
              <hr/>
              <GoogleButton type={theme} onClick={handleGoogleSignIn}>Entrar com Google</GoogleButton>
            </Frame>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  )
}

export default LoginPage
