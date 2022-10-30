import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import GoogleButton from "react-google-button";

import { Translations, Labels } from "@locale";
import { Container as PageContainer } from "./styles";
import { getPageTitle } from "@services/browser";
import { ValidationSchemas } from "@services/validations";
import { useLanguage, useAuth, useColorTheme } from "@contexts";
import {
  Form,
  EmailInput,
  PasswordInput,
  FormButton as Button,
  Frame,
  Anchor,
  ErrorAlert,
  Separator,
} from "@atomic";
import { ResponsiveCenteredPageContent } from "@styles";

export const Page: React.FC = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const { mode } = useColorTheme();
  const { googleSignIn, credentialsSignIn } = useAuth();
  const [error, setError] = useState("");

  const loginSchema = React.useMemo(() => {
    return new ValidationSchemas(language).getLoginSchema();
  }, [language]);

  const handleSubmit = async ({ email, password }) => {
    const { error } = await credentialsSignIn.signIn({
      email,
      password,
    });
    if (error) {
      setError(error);
    } else router.push("/dashboard");
  };

  const handleGoogleSignIn = async () => {
    await googleSignIn();
  };

  return (
    <PageContainer>
      <Head>
        <title>
          {getPageTitle(Translations[language][Labels.FORGOT_PASSWORD])}
        </title>
      </Head>
      <ResponsiveCenteredPageContent>
        <Frame>
          <ErrorAlert
            error={error}
            onClose={() => setError(undefined)}
            dismissible
          />
          <Form onSubmit={handleSubmit} schema={loginSchema}>
            <EmailInput name="email" />
            <PasswordInput name="password" />
            <Anchor href={"/forgot-password"}>
              {Translations[language][Labels.FORGOT_PASSWORD_QUESTION]}
            </Anchor>
            <Button loading={credentialsSignIn.loading}>
              {Translations[language][Labels.SIGNIN]}
            </Button>
          </Form>
          <Separator>{Translations[language][Labels.OR]}</Separator>
          <GoogleButton type={mode} onClick={handleGoogleSignIn} />
        </Frame>
      </ResponsiveCenteredPageContent>
    </PageContainer>
  );
};
