import React, { useEffect } from 'react'
import Head from 'next/head'

import { Translations, Labels } from '@locale';
import { Container as LoginContainer } from './styles'
import { ValidationSchemas, getPageTitle } from '@utils';
import { useLanguage, useAuth } from '@contexts';
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
              <div className="g-signin2" data-onsuccess="onSignIn">{Translations[language][Labels.LOGIN]}</div>
            </Frame>
          </Col>
        </Row>
      </Container>
    </LoginContainer>
  )
}

export default LoginPage
