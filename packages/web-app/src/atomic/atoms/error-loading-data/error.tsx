import styled from "styled-components";
import { Icons } from "../icons";
import { useLanguage } from "@contexts";
import { Translations, Labels } from "@locale";

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    font-size: 3rem;
    padding: 20px;
  }
  p {
    font-style: italic;
    text-align: center;
  }
`;

export const Error = () => {
  const { language } = useLanguage();

  return (
    <ErrorContainer>
      <Icons.DELETE />
      <p>{Translations[language][Labels.ERROR]}</p>
    </ErrorContainer>
  );
};
