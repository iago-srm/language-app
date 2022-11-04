import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

import { Container } from "./styles";
import { getPageTitle } from "@services/browser";
import { useLanguage } from "@contexts";
import { Translations, Labels } from "@locale";

export const Page: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.HOME])}</title>
      </Head>

      {/* <Image src="/images/logo.jpg" width={500} height={500}/> */}
      <h1>Language App-staging</h1>
    </Container>
  );
};
