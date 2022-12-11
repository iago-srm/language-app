import React, { useEffect } from "react";
import Head from "next/head";
import { Icons } from "@atomic";
import { DashboardButton } from "../components";
import { Container, ButtonsContainer } from "../styles.common";
import { getPageTitle } from "@services/browser";
import { useLanguage } from "@contexts";
import { Translations, Labels } from "@locale";

export const StudentPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      <h3>{Translations[language][Labels.Dashboard.STUDENT_AREA]}</h3>
      <p className="page-description">
        {Translations[language][Labels.Dashboard.DESCRIPTION]}
      </p>

      <ButtonsContainer>
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
            Translations[language][
              Labels.Dashboard.MY_LIST_ACTIVITIES_DESCRIPTION
            ]
          }
          label={Translations[language][Labels.Dashboard.MY_LIST_ACTIVITIES]}
          path="/activities"
          query={{ isMyList: true }}
          icon={
            <div style={{ transform: "scale(5)", padding: 20 }}>
              <Icons.FULL_HEART />
            </div>
          }
        />
        <DashboardButton
          description={
            Translations[language][
              Labels.Dashboard.MY_COMPLETED_ACTIVITIES_DESCRIPTION
            ]
          }
          label={
            Translations[language][Labels.Dashboard.MY_COMPLETED_ACTIVITIES]
          }
          path="/student-outputs"
          icon={<Icons.CHECK />}
        />
      </ButtonsContainer>
    </Container>
  );
};
