import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Translations, Labels } from '@locale';
import { Container as PageContainer } from './styles'
import { getPageTitle } from '@services/browser';
import { ValidationSchemas } from '@services/validations';
import { useLanguage, useAuth } from '@contexts';
import {
  Form,
  Input,
  PasswordInput,
  Button,
  Frame,
  Container,
  Row,
  Col,
  SuccessAlert,
  ErrorAlert
} from '@components';

const Page: React.FC = () => {

  const { language } = useLanguage();
  const { credentialsSignUp: {
    apiCall: credentialsSignUp,
    loading: signUpLoading
  } } = useAuth();
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
                <PasswordInput name='password' label={Translations[language][Labels.PASSWORD]} type="password" />
                <PasswordInput name='confirmPassword' label={Translations[language][Labels.CONFIRM_PASSWORD]} type="password" />
                {/* <Select label="Eu sou" name="role">
                  <option value='INSTRUCTOR'>Instrutor</option>
                  <option value='STUDENT'>Estudante</option>
                </Select> */}
                <Button loading={signUpLoading}>{Translations[language][Labels.SIGNUP]}</Button>
              </Form>
            </Frame>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  )
}

export default Page
