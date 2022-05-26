import React, { useEffect } from 'react'
import Head from 'next/head'

import { Translations, Labels } from '@locale';
import { Container as PageContainer } from './styles'
import { ValidationSchemas, getPageTitle } from '@utils';
import { LanguageContext, AuthContext } from '@contexts';
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
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.SIGNUP])}</title>
      </Head>
      <Container fluid="sm">
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Frame>
              <Form onSubmit={handleSubmit} schema={loginSchema}>
                <Input name='email' placeholder={Translations[language][Labels.EMAIL]} />
                <Input name='password' placeholder={Translations[language][Labels.PASSWORD]} type="password" />
                <Input name='password' placeholder={Translations[language][Labels.CONFIRM_PASSWORD]} type="password" />
                <Button loading={loginLoading}>{Translations[language][Labels.SIGNUP]}</Button>
              </Form>
            </Frame>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  )
}

export default LoginPage
