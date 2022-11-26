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
      <h3>Instrutor Area</h3>
      <p className="page-description">All you can do on the platform is here</p>
      <ButtonsContainer>
        <DashboardButton
          description={"Create a new activity"}
          label={"New Activity"}
          path="/activities/new"
          icon={<Icons.PLUS />}
        />
        <DashboardButton
          description={
            "Give feedback on the activities your students have done"
          }
          label={"Student's outputs"}
          path="/student-outputs"
          icon={<Icons.FOLDER />}
        />
        <DashboardButton
          description={"Browse through the activities you've made"}
          label={"My Activities"}
          path="/activities"
          query={{ thisInstructorOnly: true }}
          icon={<Icons.LIST />}
        />
        <DashboardButton
          description={"Browse through all the activities in the platform"}
          label={"Search Activities"}
          path="/activities"
          icon={<Icons.SEARCH />}
        />
        <DashboardButton
          description={
            "Invite some one to be part of your network of students and give feedback on the activities they complete"
          }
          label={"Invite Student"}
          path="/invite-student"
          icon={<Icons.USER_PLUS />}
        />
      </ButtonsContainer>
    </Container>
  );
};
