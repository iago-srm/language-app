import styled from 'styled-components';

const LanguageSelectStyled = styled.select`
  height: 1.5rem;
  width: 100px;
  margin: 0 15px;
`;

export const LanguageSelect = ({ onChange, language }) => (
  <LanguageSelectStyled onChange={onChange} value={language}>
    <option value='fr' >Français</option>
    <option value='pt' >Português</option>
    <option value='en' >English</option>
  </LanguageSelectStyled>
)
