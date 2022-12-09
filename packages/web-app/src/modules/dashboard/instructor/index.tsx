import React, { useEffect } from "react";
import Head from "next/head";
import { Icons } from "@atomic";
import { DashboardButton } from "../components";
import { Container, ButtonsContainer } from "../styles.common";
import { getPageTitle } from "@services/browser";
import { useLanguage } from "@contexts";
import { Translations, Labels } from "@locale";

export const InstructorPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      <h3>{Translations[language][Labels.Dashboard.INSTRUCTOR_AREA]}</h3>
      <p className="page-description">
        {Translations[language][Labels.Dashboard.DESCRIPTION]}
      </p>
      <ButtonsContainer>
        <DashboardButton
          description={
            Translations[language][
              Labels.Dashboard.CREATE_NEW_ACTIVITY_DESCRIPTION
            ]
          }
          label={Translations[language][Labels.Dashboard.CREATE_NEW_ACTIVITY]}
          path="/activities/new"
          icon={<Icons.PLUS />}
        />
        <DashboardButton
          description={
            Translations[language][
              Labels.Dashboard.STUDENTS_OUTPUTS_DESCRIPTION
            ]
          }
          label={Translations[language][Labels.Dashboard.STUDENTS_OUTPUTS]}
          path="/student-outputs"
          icon={<Icons.FOLDER />}
        />
        <DashboardButton
          description={
            Translations[language][Labels.Dashboard.MY_ACTIVITIES_DESCRIPTION]
          }
          label={Translations[language][Labels.Dashboard.MY_ACTIVITIES]}
          path="/activities"
          query={{ thisInstructorOnly: true }}
          icon={<Icons.LIST />}
        />
        <DashboardButton
          description={
            Translations[language][
              Labels.Dashboard.SEARCH_ACTIVITIES_DESCRIPTION
            ]
          }
          label={Translations[language][Labels.Dashboard.SEARCH_ACTIVITIES]}
          path="/activities"
          icon={<Icons.SEARCH />}
        />
        <DashboardButton
          description={
            Translations[language][Labels.Dashboard.INVITE_STUDENT_DESCRIPTION]
          }
          label={Translations[language][Labels.Dashboard.INVITE_STUDENT]}
          path="/invite-student"
          icon={<Icons.USER_PLUS />}
        />
      </ButtonsContainer>
    </Container>
  );
};
