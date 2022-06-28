import React, { useState } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Translations, Labels } from '@locale';
import { Container as PageContainer } from './styles'
import { getPageTitle } from '@services/browser';
import { ValidationSchemas } from '@services/validations';
import { useApiBuilder } from '@services/api';
import { useLanguage, useColorTheme } from '@contexts';
import {
  Form,
  Input,
  Button,
  Frame,
  ErrorAlert,
  SuccessAlert
} from '@components';
import { ResponsiveCenteredPageContent } from '@styles';

const Page: React.FC = () => {

  const router = useRouter();
  const { language } = useLanguage();
  const { theme } = useColorTheme();
  const { forgotPassword } = useApiBuilder();
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const schema = React.useMemo(() => {
    return new ValidationSchemas(language).getForgotPasswordSchema()
  }, [language]);

  const handleSubmit = async ({
    email,
  }) => {
    const { response, error } = await forgotPassword.apiCall({
      email,
    });
    if(error) {
      setError(error.message)
    }
    else setResponse(response.email);
  }

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.SIGNIN])}</title>
      </Head>
      <ResponsiveCenteredPageContent>
        <Frame>
          <ErrorAlert error={error} onClose={() => setError(undefined)}/>
          <SuccessAlert response={response && `Um email será enviado para ${response}`} dismissible={false}/>
          <Form onSubmit={handleSubmit} schema={schema}>
            <Input name='email' label={Translations[language][Labels.EMAIL]} />
            <Button loading={forgotPassword.loading}>{Translations[language][Labels.SEND]}</Button>
          </Form>
        </Frame>
      </ResponsiveCenteredPageContent>
    </PageContainer>
  )
}

export default Page
