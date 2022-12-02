import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getPageTitle } from "@services/browser";
import { Translations, Labels } from "@locale";

import { Container, InstructionsContainerStyled } from "./styles";
import {
  TitleAndDetails,
  TextContent,
  VideoContent,
  InstructionsContainer,
  Instruction,
} from "../../activities/components";
import {
  LoadingErrorData,
  FormButton,
  Tooltip,
  Icons,
  errorToast,
  successToast,
} from "@atomic";
import {
  getLabeledTopics,
  // Instruction
} from "@model";
import { useApiBuilder } from "@services/api";
import { useLanguage, useAuth } from "@contexts";

export const DetailsPage = () => {
  const router = useRouter();

  const { getStudentOutput, postFeedbackToOutput } = useApiBuilder();
  type Return = Awaited<ReturnType<typeof getStudentOutput.apiCall>>;
  const [output, setOutput] = useState<Return["response"]>(undefined);
  const [feedbacks, setFeedbacks] = useState({});
  const [instructions, setInstructions] = useState({});

  const [getOutputError, setGetOutputError] = useState<Return["error"]>();
  const { query } = useRouter();
  const { user } = useAuth();

  const { language } = useLanguage();

  useEffect(() => {
    const id = Number(query.id);
    if (isNaN(id))
      setGetOutputError({
        status: 400,
        message: "Output id is invalid",
      });
    (async () => {
      const { response, error } = await getStudentOutput.apiCall({ id });
      if (error) setGetOutputError(error);
      else {
        setOutput(response);
        setGetOutputError(undefined);
      }
    })();
  }, [query]);

  useEffect(() => {
    if (output?.activity) {
      let instructions = {};
      // console.log(output)
      output.activity.instructions.forEach((inst) => {
        const thisInstructionOutput = output.outputs.find(
          (output) => output.instructionId === inst.id
        );
        instructions = {
          ...instructions,
          [inst.id]: {
            ...inst,
            outputId: thisInstructionOutput.id,
            answer:
              inst.type === "TEXT"
                ? thisInstructionOutput.textOutput
                : inst.isMultiCorrect
                ? thisInstructionOutput.optionsSelections.map(
                    (option) => option.id
                  )
                : thisInstructionOutput.optionsSelections.map(
                    (option) => option.id
                  )[0],
            onChange: () =>
              alert(
                "Não é possível alterar a resposta de uma atividade já realizada."
              ),
          },
        };
      });
      setInstructions(instructions);
    }
  }, [output]);

  const onClickSubmitFeedback = async () => {
    const { error } = await postFeedbackToOutput.apiCall({
      outputId: Number(query.id),
      feedbacks: Object.keys(feedbacks).map((outputId) => ({
        instructionOutputId: outputId,
        feedback: feedbacks[outputId],
      })),
    });
    if (error) errorToast(error.message);
    else {
      router.push("/student-outputs");
      successToast("Feedback registrado com sucesso!");
    }
  };

  return (
    <Container>
      <Head>
        <title>
          {getPageTitle(Translations[language][Labels.STUDENT_OUTPUTS])}
        </title>
      </Head>
      <LoadingErrorData
        loading={getStudentOutput.loading}
        error={getStudentOutput}
        data={output?.activity}
      >
        {output?.activity && (
          <>
            <div className="header-section">
              <TitleAndDetails
                title={output.activity.title}
                cefr={output.activity.cefr}
                topics={getLabeledTopics(language).filter((topic) => {
                  return output.activity.topics.includes(topic.value);
                })}
              />
              <div className="icon-container">
                {output.feedbackGiven ? (
                  <Tooltip content="Feedback dado">
                    <Icons.CHECK />
                  </Tooltip>
                ) : (
                  <Tooltip content="Aguarde o feedback do seu instrutor">
                    <Icons.IN_PROGRESS />
                  </Tooltip>
                )}
              </div>
            </div>
            <hr />
            {output.activity.description}
            <hr />
            {output.activity.contentType === "TEXT" ? (
              <TextContent text={output.activity.content} />
            ) : (
              <VideoContent
                youtubeId={output.activity.content}
                start={output.activity.startTime}
                end={output.activity.endTime}
              />
            )}
            <hr />
            Respostas dadas a esta atividade
            <InstructionsContainer>
              {Object.keys(instructions).map((instructionId, i) => (
                <InstructionsContainerStyled key={instructionId}>
                  <Instruction
                    index={i}
                    instruction={instructions[instructionId]}
                  />
                  {!output.feedbackGiven && user?.role === "INSTRUCTOR" && (
                    <textarea
                      value={feedbacks[instructions[instructionId].outputId]}
                      onChange={(e) =>
                        setFeedbacks((f) => ({
                          ...f,
                          [instructions[instructionId].outputId]:
                            e.target.value,
                        }))
                      }
                    />
                  )}
                  {!output.feedbackGiven && user?.role === "STUDENT" && (
                    <p className="feedback-placeholder">
                      Um feedback para esta pergunta será dado em breve
                    </p>
                  )}
                  {output.feedbackGiven && (
                    <p className="feedback-text">
                      {
                        output.outputs.find(
                          (output) => output.instructionId === instructionId
                        ).feedback.message
                      }
                    </p>
                  )}
                </InstructionsContainerStyled>
              ))}
            </InstructionsContainer>
          </>
        )}
      </LoadingErrorData>
      {user?.role === "INSTRUCTOR" && (
        <FormButton
          disabled={output?.feedbackGiven}
          onClick={onClickSubmitFeedback}
          loading={postFeedbackToOutput.loading}
        >
          Salvar
        </FormButton>
      )}
    </Container>
  );
};

// export async function getStaticProps() {
//     const { getActivity } = useApiBuilder();

// }
