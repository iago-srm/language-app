import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { getPageTitle } from "@services/browser";
import { useLanguage, useAuth } from "@contexts";
import { Translations, Labels } from "@locale";

export const MainPage: React.FC = () => {
  const { language } = useLanguage();
  const { user, isUserLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      !user?.role && router.push("/dashboard/set-role");
      user?.role === "INSTRUCTOR" && router.push("/dashboard/instructor");
      user?.role === "STUDENT" && router.push("/dashboard/student");
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.HOME])}</title>
      </Head>
    </>
  );
};
