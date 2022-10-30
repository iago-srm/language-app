import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Container as PageContainer, ButtonContainer } from "./styles";
import { getPageTitle } from "@services/browser";
import { useLanguage, useAuth } from "@contexts";
import { Translations, Labels } from "@locale";
import {
  FormButton as Button,
  Container,
  Row,
  Col,
  ErrorAlert,
  SuccessAlert,
  AlertLink,
  LoadingErrorData,
  SelectablePanel,
} from "@atomic";
import { useApiBuilder } from "services/api";

const studentDescription = "Realize atividades e aprenda inglês";
const instructorDescription =
  "Produza atividades para os seus estudantes aprenderem inglês";

export const SetRolePage: React.FC = () => {
  const { user, isUserLoading, userError, refreshUser } = useAuth();
  const { language } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<"STUDENT" | "INSTRUCTOR">(
    "STUDENT"
  );
  const { updateUser } = useApiBuilder();
  const [error, setError] = useState<string>();

  const handleClickSave = async () => {
    const { error } = await updateUser.apiCall({ role: selectedRole });
    refreshUser();
    console.log({ error });
    if (error) setError(error.message);
  };

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.HOME])}</title>
      </Head>
      <Container fluid="sm">
        <LoadingErrorData loading={isUserLoading} data={user} error={userError}>
          {!user?.role && (
            <>
              <ErrorAlert
                dismissible={true}
                error={error}
                onClose={() => setError(undefined)}
              />
              <h1>Complete o seu cadastro</h1>
              <p>
                {selectedRole === "STUDENT"
                  ? studentDescription
                  : instructorDescription}
              </p>
              <Row className="justify-content-lg-center">
                <Col xs lg="3">
                  <SelectablePanel
                    selected={selectedRole === "STUDENT"}
                    onClick={() => setSelectedRole("STUDENT")}
                  >
                    Estudante
                  </SelectablePanel>
                </Col>
                <Col xs lg="3">
                  <SelectablePanel
                    selected={selectedRole === "INSTRUCTOR"}
                    onClick={() => setSelectedRole("INSTRUCTOR")}
                  >
                    Instrutor
                  </SelectablePanel>
                </Col>
              </Row>
              <Row className="justify-content-lg-center">
                <Col xs lg="3">
                  <Button
                    loading={updateUser.loading}
                    onClick={handleClickSave}
                  >
                    Salvar
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {user?.role && (
            <SuccessAlert
              dismissible={false}
              response={
                <span>
                  Cadastro completo. Acesse sua{" "}
                  <AlertLink href="/dashboard">página principal</AlertLink> de{" "}
                  {user.role === "INSTRUCTOR" ? "instrutor" : "estudante"}.
                </span>
              }
            />
          )}
        </LoadingErrorData>
      </Container>
    </PageContainer>
  );
};
