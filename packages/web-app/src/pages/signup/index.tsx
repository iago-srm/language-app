import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import GoogleButton from 'react-google-button';

import { Translations, Labels } from '@locale';
import { Container as PageContainer } from './styles'
import { getPageTitle } from '@services/browser';
import { ValidationSchemas } from '@services/validations';
import { useLanguage, useAuth, useColorTheme } from '@contexts';
import {
  Form,
  Input,
  PasswordInput,
  ConfirmPasswordInput,
  Button,
  Frame,
  Container,
  Row,
  Col,
  SuccessAlert,
  ErrorAlert,
  Separator
} from '@atomic';

const Page: React.FC = () => {

  const { language } = useLanguage();
  const { mode } = useColorTheme();

  const {
    credentialsSignUp: {
      apiCall: credentialsSignUp,
      loading: signUpLoading
    },
    googleSignIn
  } = useAuth();
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const schema = React.useMemo(() => {
    return new ValidationSchemas(language).getSignupSchema()
  }, [language]);

  const handleSubmit = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    const { error } = await credentialsSignUp({
      name,
      email,
      password,
      confirmPassword,
    });
    if(error) {
      setError(error.message)
    }
    else {
      setResponse("Aguarde um e-mail de confirmação");
    }
  }

  const handleGoogleSignIn = async () => {
    await googleSignIn();
  }

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.SIGNUP])}</title>
      </Head>
      <Container fluid="sm" >
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Frame>
              <ErrorAlert error={error} onClose={() => setError(undefined)}/>
              <SuccessAlert response={response} onClose={() => setResponse(undefined)}/>
              <Form onSubmit={handleSubmit} schema={schema} error={error}>
                <Input name='name' label={Translations[language][Labels.NAME]} />
                <Input name='email' label={Translations[language][Labels.EMAIL]} />
                <PasswordInput name="password" />
                <ConfirmPasswordInput name="confirmPassword" />
                <Button type="submit" loading={signUpLoading}>{Translations[language][Labels.SIGNUP]}</Button>
              </Form>
              <Separator>{Translations[language][Labels.OR]}</Separator>
              <GoogleButton type={mode} onClick={handleGoogleSignIn} />
            </Frame>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  )
}

export default Page
