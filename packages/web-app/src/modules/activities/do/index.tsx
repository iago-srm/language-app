import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Translations, Labels } from "@locale";
import { getPageTitle } from "@services/browser";

import Spinner from "react-bootstrap/Spinner";
import { Container } from "./styles";
import {
  LoadingErrorData,
  FormButton,
  errorToast,
  successToast,
  Icons,
  Tooltip,
} from "@atomic";
import {
  VideoContent,
  TextContent,
  Instruction,
  InstructionsContainer,
  TitleAndDetails,
} from "../components";
import { getLabeledTopics, Instruction as InstructionModel } from "@model";
import { useApiBuilder } from "@services/api";
import { useLanguage, useAuth } from "@contexts";

export const DoActivity = () => {
  const router = useRouter();
  const { user } = useAuth();
  const {
    getActivity,
    postStudentOutput,
    insertActivityIntoMyList,
    deleteActivityFromMyList,
  } = useApiBuilder();
  type Return = Awaited<ReturnType<typeof getActivity.apiCall>>;
  const [activity, setActivity] =
    useState<Return["response"]["activity"]>(undefined);
  const [isMyList, setIsMyList] = useState<boolean>();
  const [instructions, setInstructions] = useState<{}>({});
  const [getActivityError, setGetActivityError] = useState<Return["error"]>();
  const { query } = useRouter();

  const { language } = useLanguage();

  useEffect(() => {
    const id = Number(query.id);
    if (isNaN(id))
      setGetActivityError({
        status: 400,
        message: "Activity id is invalid",
      });
    (async () => {
      const { response, error } = await getActivity.apiCall({
        id,
        isOpen: !!query.isOpen,
      });
      if (error) setGetActivityError(error);
      else {
        setActivity({ ...response.activity });
        setIsMyList(response.activity.isMyList);
        setGetActivityError(undefined);
      }
    })();
  }, [query]);

  useEffect(() => {
    if (activity && !Object.keys(instructions).length) {
      let instructions = {};
      activity.instructions.forEach((inst) => {
        instructions = {
          ...instructions,
          [inst.id]: {
            ...inst,
            answer: inst.isMultiCorrect ? [] : "",
            onChange: (instructionId, newValues) => {
              setInstructions((insts) => ({
                ...insts,
                [instructionId]: { ...insts[instructionId], answer: newValues },
              }));
            },
          },
        };
      });
      setInstructions(instructions);
    }
  }, [activity]);

  const onClickSubmitOutput = async () => {
    const outputs = Object.keys(instructions).map((id) => {
      const thisInstruction = instructions[id];
      return {
        instructionId: id,
        textOutput: thisInstruction.type === "TEXT" && thisInstruction.answer,
        optionsSelectionsIds:
          thisInstruction.type === "OPTIONS" &&
          (thisInstruction.isMultiCorrect
            ? thisInstruction.answer
            : [thisInstruction.answer]),
      };
    });
    const { error } = await postStudentOutput.apiCall({
      activityId: activity.id,
      outputs,
    });
    if (error) errorToast(error.message);
    else {
      router.push("/student-outputs");
      successToast("Atividade realizada com sucesso!");
    }
  };

  const toggleIsMyList = async () => {
    if (query.isOpen) return;

    const { apiCall: deleteApiCall } = deleteActivityFromMyList;
    const { apiCall: insertApiCall } = insertActivityIntoMyList;

    let apiCall: typeof deleteApiCall | typeof insertApiCall;
    let message: string;

    if (isMyList) {
      apiCall = deleteApiCall;
      message = "Atividade removida da sua lista.";
    } else {
      apiCall = insertApiCall;
      message = "Atividade adicionada à sua lista.";
    }
    const { error } = await apiCall({ activityId: Number(activity.id) });
    if (!error) successToast(message);
    if (error) errorToast(error.message);

    const id = Number(query.id);
    const { response, error: getActivityError } = await getActivity.apiCall({
      id,
      isOpen: false,
    });
    if (getActivityError) setGetActivityError(getActivityError);
    else {
      setIsMyList(response.activity.isMyList);
      setGetActivityError(undefined);
    }
  };

  return (
    <Container>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.ACTIVITIES])}</title>
      </Head>
      {!user && (
        <p className="singin-warning">
          Please sign in in order to do this activity and save it to your list
        </p>
      )}
      <LoadingErrorData
        loading={!activity && getActivity.loading}
        error={getActivityError}
        data={activity}
      >
        {activity && (
          <>
            <div className="header-section">
              <TitleAndDetails
                title={activity.title}
                cefr={activity.cefr}
                topics={getLabeledTopics(language).filter((topic) => {
                  return activity.topics.includes(topic.value);
                })}
              />
              <div className="icon-container" onClick={toggleIsMyList}>
                <Tooltip content="Adicione esta atividade à sua lista">
                  {deleteActivityFromMyList.loading ||
                  insertActivityIntoMyList.loading ? (
                    <Spinner animation="border" role="status"></Spinner>
                  ) : isMyList ? (
                    <Icons.FULL_HEART />
                  ) : (
                    <Icons.EMPTY_HEART />
                  )}
                </Tooltip>
              </div>
            </div>
            <p>{activity.description}</p>
            <hr />
            {activity.contentType === "TEXT" ? (
              <TextContent text={activity.content} />
            ) : (
              <VideoContent
                youtubeId={activity.content}
                start={activity.startTime}
                end={activity.endTime}
              />
            )}
            <hr />
            <p>Answer the questions below regarding the content above</p>
            <InstructionsContainer>
              {Object.keys(instructions).map((instructionId, i) => (
                <Instruction
                  index={i}
                  key={instructionId}
                  instruction={instructions[instructionId]}
                />
              ))}
            </InstructionsContainer>
          </>
        )}
      </LoadingErrorData>
      <FormButton
        onClick={onClickSubmitOutput}
        loading={postStudentOutput.loading}
        disabled={!user}
      >
        Salvar
      </FormButton>
    </Container>
  );
};

// export async function getStaticProps() {
//     const { getActivity } = useApiBuilder();

// }
