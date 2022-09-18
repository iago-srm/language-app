import styled from 'styled-components';
import { 
    Input, 
    RadioMenu
} from '@atomic';
export * from './instruction';

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
            <Input 
                style={{ display: "inline", marginTop: "5px", width: "100%"}} 
                type="number"  
                value={value} 
                onChange={onChange}
            />
        </VideoTimeLabelStyled>
    )
}






