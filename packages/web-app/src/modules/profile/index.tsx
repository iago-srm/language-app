import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container as PageContainer, PStyled } from "./styles";
import { getPageTitle } from "@services/browser";
import { useLanguage, useAuth } from "@contexts";
import { Translations, Labels } from "@locale";
import { LoadingErrorData, Anchor, Toast } from "@atomic";
import { ProfileImageModal, ProfileImg } from "./components";
import { ResponsiveCenteredPageContent } from "@styles";

export const Page: React.FC = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { user, isUserLoading, userError } = useAuth();
  const { language } = useLanguage();
  const [image, setImage] = useState();

  // useEffect(() => {
  //   console.log('profilePage',{user})
  //   if(user) setImage(user.image)
  // },[user]);

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.PROFILE])}</title>
      </Head>
      <ResponsiveCenteredPageContent>
        <LoadingErrorData data={user} loading={isUserLoading} error={userError}>
          {user && (
            <div>
              <PStyled>Hello, {user.name}</PStyled>
              <PStyled>{user.email}</PStyled>
              <ProfileImg
                src={user.image}
                onClick={() => setModalVisible(true)}
              />
              {modalVisible && (
                <ProfileImageModal
                  onClose={() => setModalVisible(false)}
                  image={user.image}
                />
              )}
              <PStyled>
                {user.role ? (
                  `I am ${user.role}`
                ) : (
                  <Anchor href="/dashboard/set-role">
                    Complete your registration
                  </Anchor>
                )}
              </PStyled>
            </div>
          )}
        </LoadingErrorData>
      </ResponsiveCenteredPageContent>
    </PageContainer>
  );
};
