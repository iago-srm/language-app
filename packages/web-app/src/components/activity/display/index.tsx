import styled from 'styled-components';
import Ratio from 'react-bootstrap/Ratio';

const TitleStyled = styled.h1``;

enum CEFRColors {
    "A1" = "#69B34C",
    "A2" = "#ACB334",
    "B1" = "#FAB733",
    "B2" = "#FF8E15",
    "C1" = "#FF4E11",
    "C2" = "#FF0D0D",
}

const TitlePlaceholder = styled.h1`
    color: grey;
`;

const CefrStyled = styled.h5<{cefr: string}>`
    color: ${({cefr}) => CEFRColors[cefr]};
    border-radius: 2px;
    background-color: white;
    display: inline-block;
`;


export const TitleAndDetails = ({ title, cefr, topics }) => {

    return (
        <>
            {title ? <TitleStyled>{title}</TitleStyled> : <TitlePlaceholder>Title</TitlePlaceholder>}
            <CefrStyled cefr={cefr}>{"["}{cefr}{"]"}</CefrStyled>
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