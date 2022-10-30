import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Container as PageContainer,
  CefrSelectContainer,
  DescriptionTextAreaContainer,
  TopicsSelectContainer,
  TitleInputContainer,
  SubmitButtonContainer,
} from "./styles";
import { getPageTitle } from "@services/browser";
import { useLanguage } from "@contexts";
import { Translations, Labels } from "@locale";
import { useApiBuilder } from "@services/api";
import { EditableOptions, FormButton } from "@atomic";
import { Section, CEFRSelect, TopicsSelect } from "../components";
import {
  VideoIdInput,
  Description,
  ContentTypeSelectionForm,
  TextContent,
  VideoTimeInput,
  VideoContent,
  InstructionsContainer,
  Instruction,
  InstructionModal,
  TitleInput,
  ContentEditor,
  TitleAndDetails,
} from "../components";
import { useMediaQuery } from "react-responsive";
import { Instruction as InstructionModel } from "@model";

const responsiveBreakpoint = 550;
const contentSectionHeight = 500;

export const NewActivity = () => {
  const { language } = useLanguage();
  const [showNewInstructionModal, setShowNewInstructionModal] = useState(false);
  const [instructionUnderEdit, setInstructionUnderEdit] = useState<any>();

  useEffect(() => {
    if (instructionUnderEdit) setShowNewInstructionModal(true);
    else setShowNewInstructionModal(false);
  }, [instructionUnderEdit]);

  const [activity, setActivity] = useState({
    title: "",
    cefr: "",
    topics: [],
    description: "",
    startTime: 0,
    endTime: 0,
    content: {
      videoId: "",
      text: "",
    },
    contentType: "TEXT",
    instructions: [],
  });

  const setInstruction = (instruction) => {
    const newInstructions = [...activity.instructions];

    if (instructionUnderEdit) {
      const editedInstructionIndex = activity.instructions.findIndex(
        (ins) => ins.id === instruction.id
      );
      newInstructions[editedInstructionIndex] = instruction;
    } else {
      newInstructions.push(instruction);
    }

    setActivity((s) => ({ ...s, instructions: newInstructions }));
  };

  const removeInstruction = (id) => {
    if (!confirm("Deseja remover essa instrução?")) return;

    const newInstructions = [...activity.instructions];

    const removedInstructionIndex = activity.instructions.findIndex(
      (ins) => ins.id === id
    );
    newInstructions.splice(removedInstructionIndex, 1);
    setActivity((s) => ({ ...s, instructions: newInstructions }));
  };

  const { postActivity } = useApiBuilder();
  const isBigScreen = useMediaQuery({ minWidth: responsiveBreakpoint });

  const onChangeContentType = (e) =>
    setActivity((s) => ({ ...s, contentType: e }));
  const onChangeTitle = (e) =>
    setActivity((s) => ({ ...s, title: e.target.value }));
  const onChangeCEFR = (e) => setActivity((s) => ({ ...s, cefr: e.value }));
  const onChangeTopics = (e) => setActivity((s) => ({ ...s, topics: e }));
  const onChangeDescription = (e) =>
    setActivity((s) => ({ ...s, description: e.target.value }));
  const onChangeTextContent = (e) =>
    setActivity((s) => ({ ...s, content: { ...s.content, text: e } }));
  const onChangeVideoContent = (e) =>
    setActivity((s) => ({
      ...s,
      content: { ...s.content, videoId: e.target.value },
    }));
  const onChangeStartTime = (e) =>
    setActivity((s) => ({ ...s, startTime: e.target.value }));
  const onChangeEndTime = (e) =>
    setActivity((s) => ({ ...s, endTime: e.target.value }));
  const onCloseInstructionModal = () => {
    if (instructionUnderEdit) setInstructionUnderEdit(undefined);
    else setShowNewInstructionModal(false);
  };

  const onSubmitActivity = () => {
    const activityToSend = {
      ...activity,
      content:
        activity.contentType === "TEXT"
          ? activity.content.text
          : activity.content.videoId,
      topics: activity.topics.map(({ value }) => value),
    };
    postActivity.apiCall(activityToSend);
    console.log(activityToSend);
  };

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      {isBigScreen && (
        <Section>
          <Section.Left>
            <h3>Insira os dados</h3>
          </Section.Left>
          <Section.Right>
            <h3>Visualize a atividade</h3>
          </Section.Right>
        </Section>
      )}

      <Section name="Title and Details" tooltipText="Explicações">
        <Section.Left>
          <TitleInputContainer>
            <TitleInput value={activity.title} onChange={onChangeTitle} />
          </TitleInputContainer>
          <CefrSelectContainer>
            <CEFRSelect
              value={{ label: activity.cefr, value: activity.cefr }}
              onChange={onChangeCEFR}
            />
          </CefrSelectContainer>
          <TopicsSelectContainer>
            <TopicsSelect onChange={onChangeTopics} value={activity.topics} />
          </TopicsSelectContainer>
        </Section.Left>
        <Section.Right>
          <TitleAndDetails
            title={activity.title}
            cefr={activity.cefr}
            topics={activity.topics}
          />
        </Section.Right>
      </Section>
      <Section name="Descripion" tooltipText="Explicações">
        <Section.Left>
          <DescriptionTextAreaContainer>
            <textarea
              value={activity.description}
              onChange={onChangeDescription}
            />
          </DescriptionTextAreaContainer>
        </Section.Left>
        <Section.Right>
          <Description text={activity.description} />
        </Section.Right>
      </Section>
      <Section
        height={`${contentSectionHeight + 20}px`}
        name="Content"
        tooltipText="Explicações"
      >
        <Section.Header>
          <ContentTypeSelectionForm
            value={activity.contentType}
            onChange={onChangeContentType}
          />
        </Section.Header>
        {activity.contentType === "TEXT" ? (
          <Section.Content>
            <Section.Left>
              <ContentEditor
                text={activity.content.text}
                onChange={onChangeTextContent}
              />
            </Section.Left>
            <Section.Right>
              <TextContent text={activity.content.text} />
            </Section.Right>
          </Section.Content>
        ) : (
          <Section.Content>
            <Section.Left>
              <VideoIdInput
                value={activity.content.videoId}
                onChange={onChangeVideoContent}
              />
              <br />
              <VideoTimeInput
                label="Start time"
                value={activity.startTime}
                onChange={onChangeStartTime}
              />
              <VideoTimeInput
                label="End time"
                value={activity.endTime}
                onChange={onChangeEndTime}
              />
            </Section.Left>
            <Section.Right>
              <VideoContent
                youtubeId={activity.content.videoId}
                start={activity.startTime}
                end={activity.endTime}
              />
            </Section.Right>
          </Section.Content>
        )}
      </Section>
      <Section name="Instructions" tooltipText="Explicações">
        <Section.Left>
          <EditableOptions<InstructionModel>
            onClickRemove={(instruction) => removeInstruction(instruction.id)}
            onClickEdit={(instruction) => setInstructionUnderEdit(instruction)}
            options={activity.instructions}
            onClickNew={() => setShowNewInstructionModal(true)}
          />
        </Section.Left>
        <Section.Right>
          <InstructionsContainer>
            {activity.instructions.map((instruction) => (
              <Instruction
                index={instruction.id}
                instruction={{
                  ...instruction,
                  answer:
                    instruction.type === "TEXT"
                      ? instruction.textAnswer
                      : instruction.optionsAnswers.length > 1
                      ? instruction.optionsAnswers
                      : instruction.optionsAnswers[0],
                  onChange: () =>
                    alert(
                      "The answers on this page will not show to students doing the activity. They are the answers you've set as the correct ones for each question."
                    ),
                }}
              />
            ))}
          </InstructionsContainer>
        </Section.Right>
      </Section>
      {showNewInstructionModal && (
        <InstructionModal
          instructionUnderEdit={instructionUnderEdit}
          onClose={onCloseInstructionModal}
          setUpstreamInstruction={setInstruction}
        />
      )}
      <SubmitButtonContainer>
        <FormButton
          onClick={() => onSubmitActivity()}
          loading={postActivity.loading}
        >
          Salvar
        </FormButton>
      </SubmitButtonContainer>
    </PageContainer>
  );
};
