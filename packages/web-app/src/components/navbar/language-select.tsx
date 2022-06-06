import styled from 'styled-components';
import {
  SelectStyled
} from '@components';

const LanguageSelectStyled = styled(SelectStyled)`
  margin: 0 15px;
`;

export const LanguageSelect = ({ onChange, language }) => (
  <LanguageSelectStyled onChange={onChange} value={language}>
    <option value='fr' >Français</option>
    <option value='pt' >Português</option>
    <option value='en' >English</option>
  </LanguageSelectStyled>
)
