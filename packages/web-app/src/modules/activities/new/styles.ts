import styled from "styled-components";
import { PageContainer } from "@styles";

export const Container = styled.div`
  padding: 30px;
`;

export const DescriptionTextAreaContainer = styled.div`
  visibility: visible;
  textarea {
    width: 80%;
    padding: 4px;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const CefrSelectContainer = styled.div`
  width: 150px;
  padding-top: 10px;
`;

export const TopicsSelectContainer = styled.div`
  padding-top: 10px;
`;

export const TitleInputContainer = styled.div`
  width: 80%;
`;

export const SubmitButtonContainer = styled.div`
  width: 60%;
  margin: 10px auto;
`;
