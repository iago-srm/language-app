import { TopicsDisplay } from "./topics";
import { CEFRDisplay } from "./cefr";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleStyled = styled.h1`
  word-wrap: break-word;
`;

const TitlePlaceholder = styled.h1`
  color: grey;
`;

interface ITitleAndDetailsProps {
  title: string;
  cefr: string;
  topics: { label: string; value: string }[];
}
export const TitleAndDetails = ({
  title,
  cefr,
  topics,
}: ITitleAndDetailsProps) => {
  return (
    <Container>
      {title ? (
        <TitleStyled>{title}</TitleStyled>
      ) : (
        <TitlePlaceholder>Title</TitlePlaceholder>
      )}
      <div>
        {cefr && <CEFRDisplay cefr={cefr} />}
        <TopicsDisplay topics={topics} />
      </div>
    </Container>
  );
};
