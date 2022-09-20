import styled from 'styled-components';
import Ratio from 'react-bootstrap/Ratio';
import Accordion from 'react-bootstrap/Accordion';
import { RadioMenu, BreadCrumb } from '@atomic';
import { TopicsColors, CEFRColors } from '@model';

export const TopicsBreadCrumbs = {
    "SCIENCE_&_TECHNOLOGY": () => (
        <BreadCrumb color={TopicsColors["SCIENCE_&_TECHNOLOGY"]}>
            Science & Technology
        </BreadCrumb>
    ),
    "ARTS": () => (
        <BreadCrumb color={TopicsColors["ARTS"]}>
            Arts
        </BreadCrumb>
    ),
    "CURRENT_AFFAIRS": () => (
        <BreadCrumb color={TopicsColors["CURRENT_AFFAIRS"]}>
            Current Affairs
        </BreadCrumb>
    ),
    "SPORTS": () => (
        <BreadCrumb color={TopicsColors["SPORTS"]}>
            Sports
        </BreadCrumb>
    ),
}

const TitleStyled = styled.h1`
    word-wrap: break-word;
`;

const TitlePlaceholder = styled.h1`
    color: grey;
`;

const CefrStyled = styled.h5<{cefr: string}>`
    color: ${({cefr}) => CEFRColors[cefr]};
    border-radius: 2px;
    background-color: ${({theme}) => theme.colors.secondary};
    display: inline-block;
    min-width: 36px;
`;


export const TitleAndDetails = ({ title, cefr, topics }) => {

    return (
        <>
            {title ? <TitleStyled>{title}</TitleStyled> : <TitlePlaceholder>Title</TitlePlaceholder>}
            <CefrStyled cefr={cefr}>{"["}{cefr}{"]"}</CefrStyled>
            {topics.map((topic,i) => {
                const Component = TopicsBreadCrumbs[topic];
                return <Component key={i}/>
            })}
        </>
    )
}

export const Description = ({ text }) => text;

export const TextContent = ({ text }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: text }} />
    )
}

export const VideoContent = ({ url }) => {
    return (
        <div style={{ width: "100%", height: 'auto' }}>
            <Ratio aspectRatio="16x9">
            <iframe src={url} title="YouTube video" allowFullScreen></iframe>
            </Ratio>
        </div>
    )
}

const ResponseTextArea = styled.textarea`
    width: 100%;
`;

export const Instructions = ({ instructions }) => {
    return (
        <Accordion alwaysOpen>
        {instructions.map((instruction,i) => (
            <Accordion.Item key={i} eventKey={i}>
                <Accordion.Header>{instruction.text}</Accordion.Header>
                <Accordion.Body>
                    {instruction.options
                    ? 
                    instruction.answer.length === 1 ? 
                    <RadioMenu 
                        value={undefined}
                        onChange={() => {}}
                        options={instruction.options.map(option => ({ value: option.id, label: option.text}))}
                    />
                    :
                    <>Checkbox menu</>
                    // instruction.options.map((option, i) => (
                    //     <label>
                    //         {option.text}
                    //         <input type="radio" key={i}/>
                    //     </label>
                    // ))
                    : 
                    <ResponseTextArea />
                    }
                </Accordion.Body>
            </Accordion.Item>
        ))}
      </Accordion>
    )
}