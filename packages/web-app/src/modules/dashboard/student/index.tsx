import React, { useEffect } from 'react'
import Head from 'next/head'
import { Icons } from '@atomic';
import { DashboardButton } from '../components';
import { Container, ButtonsContainer } from '../styles.common'
import { getPageTitle } from '@services/browser';
import { useLanguage } from '@contexts';
import { Translations, Labels } from '@locale';

export const StudentPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      <h3>Área do Estudante</h3>
      <ButtonsContainer>
        <DashboardButton 
          description={"Browse through all the activities in the platform"}
          label={"Procurar Atividades"} 
          path="/activities" 
          icon={<Icons.SEARCH/>}
        />
        <DashboardButton 
          description={"Browse through the activities you've saved in your list"}
          label={"Atividades em Minha Lista"} 
          path="/activities" 
          query={{ isMyList: true }} 
          icon={<Icons.IN_PROGRESS/>}
        />
        <DashboardButton 
          description={"See feedback give to activities you've done in the past"}
          label={"Atividades Realizadas"} 
          path="/student-outputs" 
          icon={<Icons.CHECK/>}
        />
        
      </ButtonsContainer>
    </Container>
  )
}

