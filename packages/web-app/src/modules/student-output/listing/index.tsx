import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { 
  Container,
} from './styles';
import { getPageTitle } from '@services/browser';
import { useLanguage, useAuth } from '@contexts';
import { Translations, Labels } from '@locale';
import { useApiBuilder } from '@services/api';
import { LoadingErrorData } from '@atomic';
import { StudentOutputCard } from '../components';

export const ListingPage: React.FC = () => {

  const { language } = useLanguage();
  const { user } = useAuth();
  const { query } = useRouter();

  const {
    getStudentOutputs
  } = useApiBuilder();

  // useEffect(() => {}, []);
  const {
    data,
    loading,
    error,
  } = getStudentOutputs();

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      <LoadingErrorData
        loading={loading}
        error={error}
        data={data?.length}
      >
        <LoadingErrorData.NoData>
          Não foram encontradas atividades realizadas
        </LoadingErrorData.NoData>
        {data && data.map((output) => (
          <StudentOutputCard 
            key={output.id}
            id={output.id}
            instructorName={output.activity.instructor.user.name}
            feedbackGiven={output.feedbackGiven}
            time={output.createdAt}
            cefr={output.activity.cefr}
            title={output.activity.title}
            contentType={"TEXT"}
          />
        ))}

      </LoadingErrorData>
    </Container>
  )
}

