import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import Link from "next/link";
import { useRouter } from 'next/router';

import { Container as PageContainer } from './styles'
import { getPageTitle } from '@services/browser';
import { useLanguage } from '@contexts';
import { Translations, Labels } from '@locale';
import {
  Button,
  Container,
  Row,
  Col,
  ErrorAlert,
  SuccessAlert,
  AlertLink,
  FormButton
} from '@atomic';
import { useApiBuilder } from 'services/api';

interface IProps {
  invitationToken: string;
}

export default ({ invitationToken }: IProps) => {

  const { language } = useLanguage();
  const { getAssociationInvitation, acceptAssociationInvitation } = useApiBuilder();
  const [error, setError] = useState<string>();
  const [instructor, setInstructor] = useState({});
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      const { response, error } = await getAssociationInvitation.apiCall({
        token: invitationToken,
      });
      if(error) setError(error.message);
      else {
        setInstructor(response.instructor);
        // setSuccess(true);
      }
    };
    fetch();
  }, []);

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.ACCEPT_ASSOCIATION_INVITATION])}</title>
      </Head>
      <Container fluid="sm" >
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <SuccessAlert dismissible={false} response={success && <p>Associação realizada com sucesso! <AlertLink href='/activities'>Procurar atividades</AlertLink></p>}/>
            <ErrorAlert dismissible={false} error={error}/>
            <p>Deseja ser estudante associada a este instrutor?
            Explicação</p>
            {JSON.stringify(instructor)}
            <FormButton disabled={!!error} onClick={() => {}}>No</FormButton>
            <FormButton onClick={acceptAssociationInvitation.apiCall} loading={acceptAssociationInvitation.loading}>Yes</FormButton>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {...ctx.query}
  }
}
