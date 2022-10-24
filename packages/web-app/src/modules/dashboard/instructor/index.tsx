import React, { useEffect } from 'react'
import Head from 'next/head'
import { DashboardButton, Icons } from '@atomic';
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
      <ButtonsContainer>
        <DashboardButton label={"Nova Atividade"} path="/activities/new" icon={<Icons.PLUS/>}/>
        <DashboardButton label={"Minhas Atividades"} path="/activities" query={{ thisInstructorOnly: true }} icon={<Icons.IN_PROGRESS/>}/>
        <DashboardButton label={"Convidar estudante"} path="/invite-student" icon={<Icons.USER_PLUS/>}/>
        

      </ButtonsContainer>
    </Container>
  )
}
