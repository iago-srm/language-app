import styled from "styled-components";
import { Icons } from "../icons";
import { useLanguage } from "@contexts";
import { Translations, Labels } from "@locale";

export const NoDataContainer = styled.div`
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

export const NoData = () => {
  const { language } = useLanguage();

  return (
    <NoDataContainer>
      <Icons.SEARCH />
      <p>{Translations[language][Labels.NO_DATA]}</p>
    </NoDataContainer>
  );
};
