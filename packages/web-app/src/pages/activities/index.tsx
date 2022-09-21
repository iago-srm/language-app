import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { 
  Container,
} from './styles';
import { getPageTitle } from '@services/browser';
import { useLanguage, useAuth } from '@contexts';
import { Translations, Labels } from '@locale';
import { useApiBuilder } from '@services/api';
import { LoadingErrorData, ActivityFilters as Filters } from '@atomic';
import { DomainRules } from '@language-app/common-core';
import { getLabeledTopics } from '@model';

const Activities: React.FC = () => {

  const { language } = useLanguage();
  const { user } = useAuth();

  const [filters, setFilters] = useState({
    cefr: user && user.cefr || "A1",
    title: "",
    topics: getLabeledTopics(language),
    types: ['TEXT', 'VIDEO']
  });

  const {
    getActivities
  } = useApiBuilder();
  
  const {
    data,
    loading,
    error
  } = getActivities(filters);

  // useEffect(() => {
  //   tokenHeaderSet && (async () => {
  //     const {
  //       response: { activities },
  //       error
  //     } = await getActivities.apiCall(filters);
  //     if(!error) setActivities(() => activities);
  //     else setActivitiesError(() => error.message);
  //   })()
  // }, [tokenHeaderSet]);

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      <Filters setFilters={setFilters} filters={filters}/>
      <LoadingErrorData
        loading={loading}
        error={error}
        data={data?.activities?.length}
      >
        <LoadingErrorData.NoData>
          <h3>Não há atividades com esses filtros</h3>
        </LoadingErrorData.NoData>
        {data && data.activities && data.activities.map(activity => <p>{JSON.stringify(activity)}</p>)}

      </LoadingErrorData>
    </Container>
  )
}

export default Activities
