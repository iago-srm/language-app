import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Translations, Labels } from '@locale';
import { Container as PageContainer } from './styles';
import { getPageTitle } from '@services/browser';
import { ValidationSchemas } from '@services/validations';
import { useApiBuilder } from '@services/api';
import { useLanguage, useColorTheme } from '@contexts';
import {
  Form,
  PasswordInput,
  Button,
  Frame,
  ErrorAlert,
  SuccessAlert,
  LoadingErrorData
} from '@atomic';
import { ResponsiveCenteredPageContent } from '@styles';

interface IResetPasswordProps {
  verificationToken: string;
}

const Page: React.FC<IResetPasswordProps> = ({ verificationToken }) => {

  const { language } = useLanguage();
  const { theme } = useColorTheme();
  const { resetPassword } = useApiBuilder();

  const [updateUserError, setUpdateUserError] = useState("");
  const [updateUserResponse, setUpdateUserResponse] = useState(false);

  const schema = React.useMemo(() => {
    return new ValidationSchemas(language).getResetPasswordSchema()
  }, [language]);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const { error } = await verifyForgotPasswordToken.apiCall({
  //       token: verificationToken
  //     });
  //     if(error) setVerifyTokenError(error.message);
  //     else setVerifyTokenResponse(true);
  //   };
  //   fetch();
  // }, []);

  const handleSubmit = async ({
    password,
    confirmPassword
  }) => {
    const { error } = await resetPassword.apiCall({
      password,
      confirmPassword,
      token: verificationToken
    });
    if(error) setUpdateUserError(error.message);
    else setUpdateUserResponse(true);
  }

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.RESET_PASSWORD])}</title>
      </Head>
      <ResponsiveCenteredPageContent>
        <Frame>
          <ErrorAlert error={updateUserError} onClose={() => setUpdateUserError(undefined)}/>
          <SuccessAlert response={updateUserResponse && "Senha alterada com sucesso"} dismissible={false}/>
          <Form onSubmit={handleSubmit} schema={schema}>
            <PasswordInput name='password' label={Translations[language][Labels.PASSWORD]} type="password" />
            <PasswordInput name='confirmPassword' label={Translations[language][Labels.CONFIRM_PASSWORD]} type="password" />
            <Button loading={resetPassword.loading}>{Translations[language][Labels.SEND]}</Button>
          </Form>
        </Frame>
      </ResponsiveCenteredPageContent>
    </PageContainer>
  )
}

export default Page

export async function getServerSideProps(ctx) {
  return {
    props: {...ctx.query}
  }
}
