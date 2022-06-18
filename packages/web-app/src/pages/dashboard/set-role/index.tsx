import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';

import { Container as PageContainer } from './styles'
import { getPageTitle } from '@services/browser';
import { useLanguage } from '@contexts';
import { Translations, Labels } from '@locale';
import { ActionButton } from './action-button';
import {
  Button,
  Container,
  Row,
  Col,
  ErrorAlert,
  SuccessAlert
} from '@components';
import { useApiBuilder } from 'services/api';

const studentDescription = 'Realize atividades e aprenda inglês';
const instructorDescription = 'Produza atividades para os seus estudantes aprenderem inglês';

const SetRole: React.FC = () => {

  const router = useRouter();
  const { language } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'INSTRUCTOR'>('STUDENT');
  const { updateUser } = useApiBuilder();
  const [error, setError] = useState<string>();

  const handleClickSave = async () => {
    const { error } = await updateUser.apiCall({role: selectedRole});
    if(error) setError(error.message);
    else router.push('/dashboard');

  }
  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.HOME])}</title>
      </Head>

      <h1>Complete o seu cadastro</h1>
      <ErrorAlert error={error} setError={setError}/>
      <p>{selectedRole === 'STUDENT' ? studentDescription : instructorDescription}</p>
      <Container fluid="sm">
        <Row className="justify-content-lg-center">
          <Col xs lg="2">
            <ActionButton
              selected={selectedRole === 'STUDENT'}
              onClick={() => setSelectedRole('STUDENT')}
            >
              Estudante
            </ActionButton>
          </Col>
          <Col xs lg="2" >
            <ActionButton
              selected={selectedRole === 'INSTRUCTOR'}
              onClick={() => setSelectedRole('INSTRUCTOR')}
            >
              Instrutor
            </ActionButton>
          </Col>
        </Row>
      </Container>
      <Button
        loading={updateUser.loading}
        onClick={handleClickSave}
      >
          Salvar
      </Button>
    </PageContainer>
  )
}

export default SetRole
