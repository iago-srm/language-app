import { SingleSelect } from 'components/selects/atomic';
// import styled from 'styled-components';
// import { SelectStyled } from '../form-input/styles';

// const LanguageSelectStyled = styled(SelectStyled)`
//   margin: 0 15px;
// `;

const LanguageLabels = {
  fr: "Français",
  pt: "Português",
  en: "English"
}

export const LanguageSelect = ({ onChange, language }) => (
  // <LanguageSelectStyled onChange={onChange} value={language}>
  //   <option value='fr' >Français</option>
  //   <option value='pt' >Português</option>
  //   <option value='en' >English</option>
  // </LanguageSelectStyled>
  <SingleSelect 
    onChange={(v) => onChange(v.value)}
    value={{ label: LanguageLabels[language], value: language }}
    options={["fr", "en", "pt"].map(lang => (
      { label: LanguageLabels[lang], value: lang }
    ))}
  />
)
