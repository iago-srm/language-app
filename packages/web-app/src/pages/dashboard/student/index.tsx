import React, { useEffect } from 'react'
import Head from 'next/head'
import { DashboardButton, Icons } from '@atomic';
import { Container, ButtonsContainer } from '../styles.common'
import { getPageTitle } from '@services/browser';
import { useLanguage } from '@contexts';
import { Translations, Labels } from '@locale';

const Home: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      <h3>Área do Estudante</h3>
      <ButtonsContainer>
        <DashboardButton label={"Procurar Atividades"} path="/activities" icon={<Icons.SEARCH/>}/>
        <DashboardButton label={"Atividades em Minha Lista"} path="/activities" query={{ isMyList: true }} icon={<Icons.IN_PROGRESS/>}/>
        <DashboardButton label={"Atividades Realizadas"} path="/student-outputs" icon={<Icons.CHECK/>}/>
      </ButtonsContainer>
    </Container>
  )
}

export default Home
