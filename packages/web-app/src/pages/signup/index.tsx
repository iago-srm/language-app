import React, { useEffect } from 'react'
import Head from 'next/head'
import { useSession, signOut, signIn } from "next-auth/react";
import { Translations, Labels } from '@locale';
import { Container as PageContainer } from './styles'
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

const Page: React.FC = () => {

  const { language } = useLanguage();
  const { login, loginError, loginLoading } = useAuth();

  const schema = React.useMemo(() => {
    return new ValidationSchemas(language).getSignupSchema()
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

  const googleSignin = () => {
    signIn();
  };

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.SIGNUP])}</title>
      </Head>
      <Container fluid="sm">
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Frame>
              <Form onSubmit={handleSubmit} schema={schema}>
                <Input name='email' label={Translations[language][Labels.EMAIL]} />
                <Input name='password' label={Translations[language][Labels.PASSWORD]} type="password" />
                <Input name='confirmPassword' label={Translations[language][Labels.CONFIRM_PASSWORD]} type="password" />
                <Button loading={loginLoading}>{Translations[language][Labels.SIGNUP]}</Button>
              </Form>
              <button onClick={googleSignin}>Google Signin</button>
            </Frame>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  )
}

export default Page
