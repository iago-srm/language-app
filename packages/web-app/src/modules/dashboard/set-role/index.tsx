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

const studentDescription = "Complete activities and learn English";
const instructorDescription =
  "Make activities for your students to learn English";

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
    if (error) setError(error.message);
  };

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
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
              <h1>{Translations[language][Labels.DASHBOARD]}</h1>
              <p>
                {selectedRole === "STUDENT"
                  ? Translations[language][Labels.Dashboard.STUDENT_DESCRIPTION]
                  : Translations[language][
                      Labels.Dashboard.INSTRUCTOR_DESCRIPTION
                    ]}
              </p>
              <Row className="justify-content-lg-center">
                <Col xs lg="3">
                  <SelectablePanel
                    selected={selectedRole === "STUDENT"}
                    onClick={() => setSelectedRole("STUDENT")}
                  >
                    {Translations[language][Labels.Dashboard.STUDENT]}
                  </SelectablePanel>
                </Col>
                <Col xs lg="3">
                  <SelectablePanel
                    selected={selectedRole === "INSTRUCTOR"}
                    onClick={() => setSelectedRole("INSTRUCTOR")}
                  >
                    {Translations[language][Labels.Dashboard.INSTRUCTOR]}
                  </SelectablePanel>
                </Col>
              </Row>
              <Row className="justify-content-lg-center">
                <Col xs lg="3">
                  <Button
                    loading={updateUser.loading}
                    onClick={handleClickSave}
                  >
                    {Translations[language][Labels.Activity.SAVE]}
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
                  {
                    Translations[language][
                      Labels.Dashboard.REGISTRATION_COMPLETE
                    ]
                  }
                  {/* Registration complete. Access your{" "}
                  <AlertLink href="/dashboard">main page</AlertLink> as a{" "}
                  {user.role === "INSTRUCTOR" ? "n instructor" : "student"}. */}
                </span>
              }
            />
          )}
        </LoadingErrorData>
      </Container>
    </PageContainer>
  );
};
