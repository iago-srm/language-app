import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { ResponsiveCenteredPageContent, TwoColumns } from "@styles";
import { Container as PageContainer, InstructorDetails } from "./styles";
import { getPageTitle } from "@services/browser";
import { useLanguage, useAuth } from "@contexts";
import { Translations, Labels } from "@locale";
import {
  Button,
  Container,
  Row,
  Col,
  ErrorAlert,
  SuccessAlert,
  AlertLink,
  LoadingErrorData,
  FormButton,
  Heading,
  P,
} from "@atomic";
import { useApiBuilder } from "services/api";

interface IProps {
  invitationToken: string;
}

interface IInstructorInfo {
  user: {
    image: string;
    name: string;
  };
}
export const Page = () => {
  const { query } = useRouter();

  const { language } = useLanguage();
  const { getAssociationInvitation, acceptAssociationInvitation } =
    useApiBuilder();
  const [error, setError] = useState<string>();
  const [instructor, setInstructor] = useState<IInstructorInfo>();
  const [token, setToken] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setToken(query.token as string);
  }, [query]);

  useEffect(() => {
    const fetch = async () => {
      const { response, error } = await getAssociationInvitation.apiCall({
        token: query.token as string,
      });
      console.log(response);

      if (error) setError(error.message);
      else if (response.accepted) setAccepted(true);
      else if (response.instructor) {
        setInstructor(response.instructor);
        setError(undefined);
      }
    };
    token && fetch();
  }, [token]);

  const onClickAcceptInvitation = async () => {
    await acceptAssociationInvitation.apiCall({ token });
    setSuccess(true);
  };

  const onClickRefuseInvitation = async () => {
    router.push("/");
  };

  if (accepted) {
    return <h3>This invitation has already been accepted</h3>;
  }
  return (
    <PageContainer>
      <Head>
        <title>
          {getPageTitle(
            Translations[language][Labels.ACCEPT_ASSOCIATION_INVITATION]
          )}
        </title>
      </Head>
      <LoadingErrorData
        error={error}
        data={instructor}
        loading={getAssociationInvitation.loading}
      >
        <ResponsiveCenteredPageContent>
          {/* <SuccessAlert dismissible={false} response={success && <p>Associação realizada com sucesso! <AlertLink href='/activities'>Procurar atividades</AlertLink></p>}/> */}
          <ErrorAlert dismissible={false} error={error} />
          <Heading level={4}>
            Would you like to become a student associated to this instructor?
          </Heading>
          <P>
            After this association, the instructor will be notified of the
            activities you complete and will be able to give you feedback on
            them
          </P>
          {instructor && <InstructorDetails instructor={instructor.user} />}
          {success ? (
            <SuccessAlert
              dismissible={false}
              response={<span>Association successfully saved</span>}
            />
          ) : (
            <TwoColumns>
              <FormButton disabled={!!error} onClick={onClickRefuseInvitation}>
                No
              </FormButton>
              <FormButton
                onClick={onClickAcceptInvitation}
                loading={acceptAssociationInvitation.loading}
              >
                Yes
              </FormButton>
            </TwoColumns>
          )}
        </ResponsiveCenteredPageContent>
      </LoadingErrorData>
    </PageContainer>
  );
};
