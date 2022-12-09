import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "./styles";
import { getPageTitle } from "@services/browser";
import { useLanguage, useAuth } from "@contexts";
import { Translations, Labels } from "@locale";
import { useApiBuilder } from "@services/api";
import { LoadingErrorData } from "@atomic";
import { ActivityCard, ActivityFilters as Filters } from "../components";

export const ActivitiesListing: React.FC = () => {
  const listInnerRef = useRef();
  const { language } = useLanguage();
  const { user } = useAuth();
  const { query } = useRouter();

  const [filters, setFilters] = useState({
    cefr: user && user.cefr,
    title: "",
    topics: [],
    contentTypes: [],
    isInProgress: undefined,
    isComplete: undefined,
  });

  const { useGetActivities } = useApiBuilder();

  useEffect(() => {
    setSize(1);
  }, [filters, query]);

  const { data, loading, error, setSize, hasNoMore } = useGetActivities({
    ...filters,
    thisInstructorOnly: query.thisInstructorOnly,
    isMyList: query.isMyList,
    topics: `${filters.topics.map((t) => t.value)}`,
    cefr: filters.cefr && `${filters.cefr.value}`,
    pageSize: 4,
    isOpen: query.isOpen,
  });

  const clearAllFilters = () => {
    setFilters({
      cefr: user && user.cefr,
      title: "",
      topics: [],
      contentTypes: [],
      isInProgress: undefined,
      isComplete: undefined,
    });
  };

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.ACTIVITIES])}</title>
      </Head>
      <Filters
        setFilters={setFilters}
        filters={filters}
        clearAll={clearAllFilters}
      />
      <LoadingErrorData loading={loading} error={error} data={!!data?.length}>
        {data &&
          data.map((activity) => (
            <ActivityCard
              key={activity.id}
              id={activity.id}
              topics={activity.topics}
              cefr={activity.cefr}
              description={activity.description}
              title={activity.title}
              contentType={activity.contentType}
              isOpen={query.isOpen}
            />
          ))}
        <div className="button-container">
          <button
            disabled={hasNoMore}
            onClick={() => {
              // setCursor(data.cursor);
              setSize((size) => size + 1);
            }}
          >
            {loading ? "..." : "Show More"}
          </button>
        </div>
      </LoadingErrorData>
    </Container>
  );
};
