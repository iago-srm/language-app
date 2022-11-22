import styled from "styled-components";
import { Icons } from "../icons";
import { useLanguage } from "@contexts";
import { Translations, Labels } from "@locale";

export const NoDataContainer = styled.div``;

export const NoData = () => {
  const { language } = useLanguage();

  return (
    <NoDataContainer>{Translations[language][Labels.NO_DATA]}</NoDataContainer>
  );
};
