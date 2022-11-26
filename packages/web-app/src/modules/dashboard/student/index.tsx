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
      <h3>Studante Area</h3>
      <p className="page-description">All you can do on the platform is here</p>

      <ButtonsContainer>
        <DashboardButton
          description={"Browse through all the activities in the platform"}
          label={"Search Activities"}
          path="/activities"
          icon={<Icons.SEARCH />}
        />
        <DashboardButton
          description={
            "Browse through the activities you've saved in your list"
          }
          label={"Activities in My List"}
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
            "See feedback give to activities you've done in the past"
          }
          label={"My Completed Activities"}
          path="/student-outputs"
          icon={<Icons.CHECK />}
        />
      </ButtonsContainer>
    </Container>
  );
};
