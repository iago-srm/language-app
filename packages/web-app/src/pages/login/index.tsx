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
  Button,
  Frame,
  Container,
  Row,
  Col
} from '@components';

const LoginPage: React.FC = () => {

  const { language } = useLanguage();
  const { theme } = useColorTheme();
  const {
    googleSignIn,
    credentialsSignIn,
    // loginError,
    // loginLoading
  } = useAuth();
  const [error, setError] = useState();
  // const { signInUseCase } = useApi();

  const loginSchema = React.useMemo(() => {
    return new ValidationSchemas(language).getLoginSchema()
  }, [language]);

  // useEffect(() => {
  //   if(rror) alert(loginError);
  // }, [loginError]);

  const handleSubmit = async (data) => {
    // const { error } = await credentialsSignIn(data);
    const resp = await credentialsSignIn(data)
    console.log({resp})
    // const resp = await login({
    //   email: data.email,
    //   password: data.password
    // });
    //console.log(resp)
    if(error) {
      setError(error)
    }
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
                <Input name='password' label={Translations[language][Labels.PASSWORD]} type="password" />
                <Button loading={false}>{Translations[language][Labels.LOGIN]}</Button>
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
