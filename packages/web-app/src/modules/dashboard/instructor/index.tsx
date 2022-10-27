import React, { useEffect } from 'react'
import Head from 'next/head'
import { Icons } from '@atomic';
import { DashboardButton } from '../components';
import { Container, ButtonsContainer } from '../styles.common'
import { getPageTitle } from '@services/browser';
import { useLanguage } from '@contexts';
import { Translations, Labels } from '@locale';

export const InstructorPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      <h3>Área do Instrutor</h3>
      <p className="page-description">All you can do in the platform is here</p>
      <ButtonsContainer>
        <DashboardButton 
          description={"Create a new activity"}
          label={"Nova Atividade"} 
          path="/activities/new" 
          icon={<Icons.PLUS/>}
        />
        <DashboardButton 
          description={"Give feedback on the activities your students have done"}
          label={"Produção dos Estudantes"} 
          path="/student-outputs" 
          icon={<Icons.FOLDER/>}
        />
        <DashboardButton 
          description={"Browse through the activities you've made"}
          label={"Minhas Atividades"} 
          path="/activities" 
          query={{ thisInstructorOnly: true }} 
          icon={<Icons.LIST/>}
        />
        <DashboardButton 
          description={"Browse through all the activities in the platform"}
          label={"Procurar Atividades"} 
          path="/activities" 
          icon={<Icons.SEARCH/>}
        />
        <DashboardButton 
          description={"Invite some one to be part of your network of students and give feedback on the activities they complete"}
          label={"Convidar estudante"} 
          path="/invite-student" 
          icon={<Icons.USER_PLUS/>}
        />
      </ButtonsContainer>
    </Container>
  )
}
