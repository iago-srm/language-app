import styled from 'styled-components';
import { 
    Input, 
    RadioMenu,
    QuestionTooltip
} from '@atomic';
export * from './instruction';

export const TitleInput = ({ value, onChange }) => {
    return (
        <Input 
            placeholder="Title" 
            value={value} 
            onChange={onChange}
      />
    )    
}
export const ContentTypeSelectionForm = ({ value, onChange }) => {
    return (
        <RadioMenu 
            value={value}
            onChange={onChange}
            options={[
                {value: "TEXT", label: "Texto"},
                {value: "VIDEO", label: "Video"},
            ]}
        />
    )
}

const VideoTimeLabelStyled = styled.label`
    display: inline-block; 
    width: 30%;
    margin: 10px 8% 0 0;
    input {
        display: inline;
        margin-top: 5px; 
        width: 70%;
    }
`;

export const VideoTimeInput = ({ label, value, onChange }) => {

    return (
        <VideoTimeLabelStyled>
            <span>{label}</span>
            <QuestionTooltip content={"Time in seconds"}/>
            <Input 
                type="number"  
                value={`${value}`} 
                onChange={onChange}
            />
        </VideoTimeLabelStyled>
    )
}

const VideoInputStyled = styled.div`
    width: 100%;
    div.input {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    div.input input {
        border: none;
        min-width: 40%;
        padding: 10px;
        border-radius: 3px;
        background-color: ${p => p.theme.colors.secondary};
        color: ${p => p.theme.colors.text};
        ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: ${p => p.theme.colors.text};
          opacity: 0.5; /* Firefox */
        }
    } 
    div.input span {
        color: ${p => p.theme.colors.text};
        opacity: 0.5;
        padding-right: 3px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 50%;
        display: inline-block; 
        line-height: 42px;
        direction: rtl;
        text-align: left;
    }
`;

export const VideoIdInput = ({ value, onChange }) => {
    return (
        <VideoInputStyled>
            <div>
                <span>Video Id</span>
                <QuestionTooltip content={"Insert the video ID. It is the characters after the 'v=' in the video url."}/>
            </div>
            <div className="input">
                <span>{"=https://youtube.com/watch?v"}</span>
                <input 
                    placeholder="video ID" 
                    value={value}
                    onChange={onChange}

                />
            </div>
        </VideoInputStyled>

    )
}





