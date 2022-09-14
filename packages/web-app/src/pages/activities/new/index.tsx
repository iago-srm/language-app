import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { 
  Container as PageContainer, 
  CefrSelectContainer, 
  DescriptionTextAreaContainer,
} from './styles';
import { Section } from './section';
import { getPageTitle } from '@services/browser';
import { useLanguage } from '@contexts';
import { Translations, Labels } from '@locale';
import { useApiBuilder } from '@services/api';
import { 
  InputStyled, 
  CustomEditor, 
  TitleAndDetails, 
  CEFRSelect,
  ContentTypeSelectionForm,
  TextContent,
  VideoTimeInput,
  VideoContent,
  Instructions,
  EditableOptions,
  InstructionModal,
} from '@components';
import { useMediaQuery } from 'react-responsive';
import {
  InstructionType,
  Instruction
} from '@model';

const responsiveBreakpoint = 550;
const contentSectionHeight = 500;


const Activities: React.FC = () => {

  const { language } = useLanguage();
  const [showNewInstructionModal, setShowNewInstructionModal] = useState(false);
  const [instructionUnderEdit, setInstructionUnderEdit] = useState<any>();
  
  useEffect(() => {
    if(instructionUnderEdit) setShowNewInstructionModal(true);
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
      video: "",
      text: ""
    },
    contentType: "TEXT",
    instructions: [
      {
        id: "1",
        text: "Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum", 
        options: [
          { id: "1", text: "meu cu", isCorrect: true},
          { id: "2", text: "seu cu", isCorrect: true},
        ], 
        answer: ["1", "2"],
        type: InstructionType.OPTIONS
      },
      {id: "2", text: "Lorem cu", answer: "A vida é dura", type: InstructionType.TEXT }

    ]
  });

  const setInstruction = (instruction) => {
    const newInstructions = [...activity.instructions];

    if(instructionUnderEdit) {
      const editedInstructionIndex = activity.instructions.findIndex(ins => ins.id === instruction.id);
      newInstructions[editedInstructionIndex] = instruction;
    } else {
      newInstructions.push(instruction);
    }

    setActivity(s => ({...s, instructions: newInstructions}));
  }

  const removeInstruction = (id) => {
    if(!confirm("Deseja remover essa instrução?")) return;

    const newInstructions = [...activity.instructions];

    const removedInstructionIndex = activity.instructions.findIndex(ins => ins.id === id);
    newInstructions.splice(removedInstructionIndex,1);
    setActivity(s => ({...s, instructions: newInstructions}));

  }

  const {
    postActivity
  } = useApiBuilder();
  const isBigScreen = useMediaQuery({ minWidth: responsiveBreakpoint });

  const onChangeContentType = (e) => setActivity(s => ({...s, contentType: e.target.value}));
  const onChangeTitle = (e) => setActivity(s => ({...s, title: e.target.value}));
  const onChangeCEFR = (e) => setActivity(s => ({...s, cefr: e}));
  const onChangeDescription = (e) => setActivity(s => ({...s, description: e.target.value}));
  const onChangeTextContent = (e) => setActivity(s => ({...s, content: {...s.content, text: e }}));
  const onChangeVideoContent = (e) => setActivity(s => ({...s, content: {...s.content, video: e.target.value}}));
  const onChangeStartTime = (e) => setActivity(s => ({...s, startTime: e.target.value }));
  const onChangeEndTime = (e) => setActivity(s => ({...s, endTime: e.target.value }));
  const onCloseInstructionModal = () => {
    if(instructionUnderEdit) setInstructionUnderEdit(undefined);
    else setShowNewInstructionModal(false);
  }

  return (
    <PageContainer>
      <Head>
        <title>{getPageTitle(Translations[language][Labels.DASHBOARD])}</title>
      </Head>
      {isBigScreen && <Section>
        <Section.Left>
            <h3>Insira os dados</h3>
        </Section.Left>
        <Section.Right>
            <h3>Visualize a atividade</h3>
        </Section.Right>
      </Section>}

      <Section name="Title and Details" tooltipText='Explicações'>
        <Section.Left>
            <InputStyled 
              placeholder="Title" 
              width="80%" 
              value={activity.title} 
              onChange={onChangeTitle}
            />
          <CefrSelectContainer>
            <CEFRSelect value={activity.cefr} onChange={onChangeCEFR}/>
          </CefrSelectContainer>
        </Section.Left>
        <Section.Right>
          <TitleAndDetails 
            title={activity.title} 
            cefr={activity.cefr} 
            topics={activity.topics}
          />
        </Section.Right>
      </Section>
      <Section name="Description" tooltipText='Explicações'>
        <Section.Left>
          <div></div>
            <DescriptionTextAreaContainer>
              <textarea 
                value={activity.description} 
                onChange={onChangeDescription}
              />
            </DescriptionTextAreaContainer>
        </Section.Left>
        <Section.Right>
            {activity.description}
        </Section.Right>
      </Section>
      <Section 
        height={`${contentSectionHeight + 20}px`} 
        name="Content" 
        tooltipText='Explicações'
      >
        <Section.Header>
          <ContentTypeSelectionForm 
            value={activity.contentType} 
            onChange={onChangeContentType}
          />
        </Section.Header>
        {activity.contentType === "TEXT" ? 
          <Section.Content>
            <Section.Left>
              <div></div>
              <CustomEditor 
                text={activity.content.text} 
                onChange={onChangeTextContent}
              />
            </Section.Left>
            <Section.Right>
                <TextContent text={activity.content.text} />
            </Section.Right>
          </Section.Content> 
          : 
          <Section.Content>
            <Section.Left>
              <InputStyled 
                placeholder="Youtube URL" 
                width="85%" 
                value={activity.content.video} 
                onChange={onChangeVideoContent}
              />
              <br/>
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
              <VideoContent url={activity.content.video}/>
            </Section.Right>
          </Section.Content>
        }
      </Section>
      <Section name="Instructions" tooltipText='Explicações'>
        <Section.Left>
          <EditableOptions<Instruction> 
            onClickRemove={(instruction) => removeInstruction(instruction.id)}
            onClickEdit={(instruction) => setInstructionUnderEdit(instruction)}
            options={activity.instructions}
            onClickNew={() => setShowNewInstructionModal(true)}
          />
        </Section.Left>
        <Section.Right>
          <Instructions instructions={activity.instructions} />
        </Section.Right>
      </Section>
      {showNewInstructionModal && 
        <InstructionModal 
          instructionUnderEdit={instructionUnderEdit}
          onClose={onCloseInstructionModal}
          setUpstreamInstruction={setInstruction}
        />}
    </PageContainer>
  )
}

export default Activities
