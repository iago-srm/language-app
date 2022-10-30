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

  const { getActivities } = useApiBuilder();

  useEffect(() => {
    setSize(1);
  }, [filters, query]);

  const { data, loading, error, setSize, hasNoMore } = getActivities({
    ...filters,
    thisInstructorOnly: query.thisInstructorOnly,
    isComplete: query.isComplete,
    isInProgress: query.isInProgress,
    topics: `${filters.topics.map((t) => t.value)}`,
    cefr: filters.cefr && `${filters.cefr.value}`,
    pageSize: 4,
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = (e) => {
    // console.log(e)
    const { scrollTop, scrollHeight, clientHeight, offsetTop } = e.target;
    console.log(scrollHeight, scrollTop, clientHeight);

    // if (listInnerRef.current) {
    //   const { scrollTop, scrollHeight, clientHeight, offsetTop } = listInnerRef.current;
    //   console.log(scrollHeight,offsetTop,clientHeight)
    //   if (scrollTop + clientHeight === scrollHeight) {
    //     // TO SOMETHING HERE
    //     console.log('Reached bottom')
    //   }
    // }
  };
  return (
    <Container onScroll={handleScroll} ref={listInnerRef}>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      <Filters
        setFilters={setFilters}
        filters={filters}
        clearAll={clearAllFilters}
      />
      <LoadingErrorData
        // loading={loading}
        loading={false}
        error={error}
        data={!!data?.length}
        // data={true}
      >
        <LoadingErrorData.NoData>
          <h3>Não há atividades com esses filtros</h3>
        </LoadingErrorData.NoData>
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
