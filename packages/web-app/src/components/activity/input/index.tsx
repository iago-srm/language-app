import styled from 'styled-components';
import { 
    InputStyled,  
} from '@components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

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

export const EditableInstructionContainer = styled.div`
    display: flex;
    p {
        margin: 0;
        padding: 2px 5px;
        line-height: 30px;
        width: 90%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    div {
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
`;

export const EditableInstruction = ({ text, onClick, number }) => {
    return (
        <EditableInstructionContainer >
            <p>{text}</p>
            <div onClick={onClick}><FontAwesomeIcon icon={faPen} /></div>
        </EditableInstructionContainer>
    )
}

const NewInstructionButtonStyled = styled.button`
    width: 100%;
    span {
        font-size: 1.2rem;
    }
`;

export const NewInstructionButton = ({ children, ...rest }) => {
    return (
        <NewInstructionButtonStyled {...rest}>
            <span>+</span>
            {children}
        </NewInstructionButtonStyled>
    )
}