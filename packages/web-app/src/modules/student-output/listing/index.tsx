import React, { useState, useEffect } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { Container } from "./styles";
import { getPageTitle } from "@services/browser";
import { useLanguage, useAuth } from "@contexts";
import { Translations, Labels } from "@locale";
import { useApiBuilder } from "@services/api";
import { LoadingErrorData, SingleSelect } from "@atomic";
import { StudentOutputCard } from "../components";

export const ListingPage: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { query } = useRouter();
  const [selectedStudent, setSelectedStudent] = useState({ id: "", name: "" });
  const { useGetStudentOutputs, useGetStudents } = useApiBuilder();

  const {
    data: studentOutputs,
    loading: studentOutputsLoading,
    error: studentOutputsError,
  } = useGetStudentOutputs(query.studentId as string); // select puts student id in url
  const {
    data: students,
    loading: studentsLoading,
    error: studentsError,
  } = useGetStudents(); // select puts student id in url

  useEffect(() => {
    if (students && students.length) {
      setSelectedStudent(students[0]);
      Router.push(
        {
          pathname: "/student-outputs",
          query: { studentId: students[0].id },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [students]);

  const onChangeStudentSelect = ({ label, value }) => {
    setSelectedStudent({ name: label, id: value });
    Router.push(
      {
        pathname: "/student-outputs",
        query: { studentId: value },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Container>
      <Head>
        <title>
          {getPageTitle(Translations[language][Labels.STUDENT_OUTPUTS])}
        </title>
      </Head>
      {user && user.role === "INSTRUCTOR" && selectedStudent && (
        <div className="student-select">
          <label>
            <p>
              Choose one of your students whose output you would like to list
            </p>
            <SingleSelect
              options={(students || []).map((e) => ({
                label: e.name,
                value: e.id,
              }))}
              value={{ label: selectedStudent.name, value: selectedStudent.id }}
              onChange={onChangeStudentSelect}
            />
          </label>
        </div>
      )}
      <LoadingErrorData
        loading={studentOutputsLoading}
        error={studentOutputsError}
        data={studentOutputs?.data.length}
      >
        {/* <LoadingErrorData.NoData>
          Não foram encontradas atividades realizadas
        </LoadingErrorData.NoData> */}

        {studentOutputs &&
          studentOutputs.data.map((output) => (
            <StudentOutputCard
              key={output.id}
              id={output.id}
              instructorName={output.activity.instructor.user.name}
              feedbackGiven={output.feedbackGiven}
              time={output.createdAt}
              cefr={output.activity.cefr}
              title={output.activity.title}
              contentType={"TEXT"}
            />
          ))}
      </LoadingErrorData>
    </Container>
  );
};
