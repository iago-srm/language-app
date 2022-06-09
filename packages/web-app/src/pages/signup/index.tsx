import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Translations, Labels } from '@locale';
import { Container as PageContainer, ErrorContainer } from './styles'
import { ValidationSchemas, getPageTitle } from '@utils';
import { useLanguage, useAuth } from '@contexts';
import {
  Form,
  Input,
  PasswordInput,
  Select,
  Button,
  Frame,
  Container,
  Row,
  Col,
  ErrorAlert
} from '@components';

const Page: React.FC = () => {

  const { language } = useLanguage();
  const { credentialsSignUp } = useAuth();
  const [error, setError] = useState();

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
      setError(error)
    }
    else alert('aguarde um e-mail de confirmação')

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
              {/* <ErrorContainer>{error}</ErrorContainer> */}
              {error && <ErrorAlert onClose={() => setError(undefined)}>
                <ErrorAlert.Heading>Houve um erro</ErrorAlert.Heading>
                <ErrorAlert.Content>{error}</ErrorAlert.Content>
              </ErrorAlert>}
              <Form onSubmit={handleSubmit} schema={schema} error={error}>
                <Input name='name' label={Translations[language][Labels.NAME]} />
                <Input name='email' label={Translations[language][Labels.EMAIL]} />
                <PasswordInput name='password' label={Translations[language][Labels.PASSWORD]} type="password" />
                <PasswordInput name='confirmPassword' label={Translations[language][Labels.CONFIRM_PASSWORD]} type="password" />
                {/* <Select label="Eu sou" name="role">
                  <option value='INSTRUCTOR'>Instrutor</option>
                  <option value='STUDENT'>Estudante</option>
                </Select> */}
                <Button loading={false}>{Translations[language][Labels.SIGNUP]}</Button>
              </Form>
            </Frame>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  )
}

export default Page
