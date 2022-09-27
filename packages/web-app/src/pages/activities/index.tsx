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
import { ActivityCard } from '@atomic';

const Activities: React.FC = () => {

  const { language } = useLanguage();
  const { user } = useAuth();

  const [filters, setFilters] = useState({
    cefr: user && user.cefr,
    title: "",
    topics: [],
    contentType: [],
    isInProgress: undefined,
    isComplete: undefined
  });

  const {
    getActivities
  } = useApiBuilder();
  
  useEffect(() => {
    refreshActivities();
  }, [filters]);

  const {
    data,
    loading,
    error,
    mutate: refreshActivities
  } = getActivities({...filters, topics: `${filters.topics.map(t => t.value)}`});

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
        {data && data.activities && data.activities.map(activity => (
          <ActivityCard 
            topics={activity.topics} 
            cefr={activity.cefr}
            description={activity.description}
            title={activity.title}
            contentType={"TEXT"}
          />
        ))}

      </LoadingErrorData>
    </Container>
  )
}

export default Activities
