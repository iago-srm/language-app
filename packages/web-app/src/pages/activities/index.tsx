import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { 
  Container,
} from './styles';
import { getPageTitle } from '@services/browser';
import { useLanguage, useAuth } from '@contexts';
import { Translations, Labels } from '@locale';
import { DomainRules } from '@language-app/common-core';
import { Filters } from './filters';
import { useApiBuilder } from '@services/api';
import { LoadingErrorData } from '@components';

const Activities: React.FC = () => {

  const { language } = useLanguage();
  const { user, tokenHeaderSet } = useAuth();

  const [filters, setFilters] = useState({
    cefr: user && user.cefr,
    title: "",
    topics: DomainRules.ACTIVITY.TOPICS,
  });
  const [activities, setActivities] = useState([]);
  const [activitiesError, setActivitiesError] = useState<string>();

  const {
    getActivities
  } = useApiBuilder();

  useEffect(() => {
    tokenHeaderSet && (async () => {
      const {
        response: { activities },
        error
      } = await getActivities.apiCall(filters);
      if(!error) setActivities(() => activities);
      else setActivitiesError(() => error.message);
    })()
  }, [tokenHeaderSet]);

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      <Filters setFilters={setFilters} filters={filters}/>
      <LoadingErrorData
        loading={getActivities.loading}
        error={activitiesError}
        data={activities.length}
      >

      </LoadingErrorData>
    </Container>
  )
}

export default Activities
