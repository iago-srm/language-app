import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { 
  Container,
} from './styles';
import { getPageTitle } from '@services/browser';
import { useLanguage,useAuth } from '@contexts';
import { Translations, Labels } from '@locale';
import { useApiBuilder } from '@services/api';
import { LoadingErrorData } from '@atomic';
import { ActivityCard, ActivityFilters as Filters } from '../components';


export const ActivitiesListing: React.FC = () => {

  const { language } = useLanguage();
  const { user } = useAuth();
  const { query } = useRouter();

  const [filters, setFilters] = useState({
    cefr: user && user.cefr,
    title: "",
    topics: [],
    contentTypes: [],
    isInProgress: undefined,
    isComplete: undefined,
  });

  const {
    getActivities
  } = useApiBuilder();
  
  useEffect(() => {
    setSize(1);
  }, [filters]);

  const {
    data,
    loading,
    error,
    setSize,
    hasNoMore
  } = getActivities({
    ...filters, 
    thisInstructorOnly: query.thisInstructorOnly,
    isComplete: query.isComplete,
    isInProgress: query.isInProgress,
    topics: `${filters.topics.map(t => t.value)}`,
    cefr: filters.cefr && `${filters.cefr.value}`,
    pageSize: 2
  });

  const clearAllFilters = () => {
    setFilters({
      cefr: user && user.cefr,
      title: "",
      topics: [],
      contentTypes: [],
      isInProgress: undefined,
      isComplete: undefined
    });
  };

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      <Filters setFilters={setFilters} filters={filters} clearAll={clearAllFilters}/>
      <LoadingErrorData
        // loading={loading}
        loading={false}
        error={error}
        data={!!data?.length}
        // data={true}
      >
        <LoadingErrorData.NoData>
          <h3>Não há atividades com esses filtros</h3>
        </LoadingErrorData.NoData>
        {data && data.map((activity) => (
          <ActivityCard 
            key={activity.id}
            id={activity.id}
            topics={activity.topics} 
            cefr={activity.cefr}
            description={activity.description}
            title={activity.title}
            contentType={activity.contentType}
          />
        ))}
        <button disabled={hasNoMore} onClick={() => {
          // setCursor(data.cursor);
          setSize(size => size + 1)
        }}>{loading ? "..." : "More results"}</button>

      </LoadingErrorData>
    </Container>
  )
}

