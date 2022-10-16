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
  FormButton as Button,
  Frame,
  ErrorAlert,
  SuccessAlert
} from '@atomic';
import { ResponsiveCenteredPageContent } from '@styles';

const Page: React.FC = () => {

  const router = useRouter();
  const { language } = useLanguage();
  const { theme } = useColorTheme();
  const { inviteStudent } = useApiBuilder();
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const schema = React.useMemo(() => {
    return new ValidationSchemas(language).getInviteStudentSchema()
  }, [language]);

  const handleSubmit = async ({
    email,
  }) => {
    const { response, error } = await inviteStudent.apiCall({
      email,
    });
    if(error) {
      setError(error.message);
      setResponse(undefined);
    }
    else {
      setError(undefined);
      setResponse(response.email);
    }
  }

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.INVITE_STUDENT])}</title>
      </Head>
      <ResponsiveCenteredPageContent>
        <Frame>
          <ErrorAlert error={error} onClose={() => setError(undefined)} dismissible/>
          <SuccessAlert response={response && `O estudante receberá um e-mail de convite.`} dismissible={false}/>
          <Form onSubmit={handleSubmit} schema={schema}>
            <Input name='email' label={Translations[language][Labels.EMAIL]} />
            <Button loading={inviteStudent.loading}>{Translations[language][Labels.SEND]}</Button>
          </Form>
        </Frame>
      </ResponsiveCenteredPageContent>
    </PageContainer>
  )
}

export default Page
