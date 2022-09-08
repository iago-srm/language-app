import React, { useState } from 'react'
import Head from 'next/head'
import { 
  Container,
} from './styles';
import { getPageTitle } from '@services/browser';
import { useLanguage, useAuth } from '@contexts';
import { Translations, Labels } from '@locale';
import { DomainRules } from '@language-app/common-core';
import { Filters } from './filters';

const Activities: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    cefr: user && user.cefr,
    title: "",
    topics: DomainRules.ACTIVITY.TOPICS,
  })

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      <Filters setFilters={setFilters} filters={filters}/>
    </Container>
  )
}

export default Activities
