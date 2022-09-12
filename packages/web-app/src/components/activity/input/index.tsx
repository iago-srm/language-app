import styled from 'styled-components';
import { 
    InputStyled,  
} from '@components';

export const ContentTypeSelectionFormStyled = styled.form`
    label {
        padding: 3px 11px;
    }
`;

export const ContentTypeSelectionForm = ({ value, onChange }) => {
    return (
        <ContentTypeSelectionFormStyled>
        <label>
          <input
            type="radio"
            value="TEXT"
            checked={value === "TEXT"}
            onChange={onChange}
          />
            Texto
          </label>
          <label>
          <input
            type="radio"
            value="VIDEO"
            checked={value === "VIDEO"}
            onChange={onChange}
          />
            Video
        </label>
      </ContentTypeSelectionFormStyled>
    )
}

const VideoTimeLabelStyled = styled.label`
    display: inline-block; 
    width: 20%;
    margin: 10px 8% 0 0;

    p {
        margin: 0;
    }
`;
export const VideoTimeInput = ({ label, value, onChange }) => {

    return (
        <VideoTimeLabelStyled>
            <p>{label}</p>
            <InputStyled 
                style={{ display: "inline", marginTop: "5px", width: "100%"}} 
                type="number"  
                value={value} 
                onChange={onChange}
            />
        </VideoTimeLabelStyled>
    )
}