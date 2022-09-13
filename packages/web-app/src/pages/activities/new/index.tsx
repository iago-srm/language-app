import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { 
  Container as PageContainer, 
  CEFRSelectContainer, 
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
  EditableInstruction,
  NewInstructionButton
} from '@components';
import { useMediaQuery } from 'react-responsive';

const responsiveBreakpoint = 550;
const contentSectionHeight = 500;

const Activities: React.FC = () => {

  const { language } = useLanguage();
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
      {text: "Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum", options: [{ a: "5", b: "6", c: "7" }], answer: ["a", "b"]},
      {text: "Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum", options: [{ a: "5", b: "6", c: "7" }], answer: ["a", "b"]}

    ]
  });
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
            <CEFRSelectContainer>
              <CEFRSelect value={activity.cefr} onChange={onChangeCEFR}/>
            </CEFRSelectContainer>
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
          {activity.instructions.map((instruction, i) => (
            <EditableInstruction 
              key={i} 
              number={i} 
              onClick={() => {}} 
              text={instruction.text}
            />
          ))}
          <NewInstructionButton>Nova atividade</NewInstructionButton>
        </Section.Left>
        <Section.Right>
          <Instructions instructions={activity.instructions} />
        </Section.Right>
      </Section>
    </PageContainer>
  )
}

export default Activities
