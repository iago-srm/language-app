import Accordion from 'react-bootstrap/Accordion';
import { TopicsColors, CEFRColors, Instruction as InstructionModel } from '@model';
import { RadioMenu, CheckboxMenu } from '@atomic';
import styled from 'styled-components';

const ResponseTextArea = styled.textarea`
    width: 100%;
`;

const StyledHeader = styled(Accordion.Header)`
    .accordion-button {
        background-color: ${({theme}) => theme.colors.secondary};
        color: ${({theme}) => theme.colors.text};
    }
    
    .accordion-button:focus {
        box-shadow: none;
    }  
`;

const StyledBody = styled(Accordion.Body)`
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.text};
`;

interface IInstructionWithHandler extends InstructionModel {
    answer: string | string[];
    onChange: (instructionId: string, newValue: string | string[]) => any;
}
interface IInstructionProps {
    instruction: IInstructionWithHandler;
    index: number;
}

export const Instruction = ({ instruction, index }: IInstructionProps) => {
    
    return ( 
        <Accordion.Item eventKey={`${index}`}>
                <StyledHeader>{instruction.text}</StyledHeader>
                <StyledBody >
                    {instruction.type === "OPTIONS"
                    ? 
                    instruction.optionsAnswers.length === 1 ? 
                    <RadioMenu 
                        value={instruction.answer as string}
                        onChange={(e) => instruction.onChange(instruction.id, e)}
                        options={instruction.options.map(option => ({ value: option.id, label: option.text}))}
                        vertical={true}
                    />
                    :
                    <CheckboxMenu 
                        values={instruction.answer as string[]}
                        onChange={(e) => instruction.onChange(instruction.id, e)}
                        options={instruction.options.map(option => ({ value: option.id, label: option.text}))}
                        vertical={true}
                    />
                    : 
                    <ResponseTextArea 
                        value={instruction.answer}
                        onChange={(e) => instruction.onChange(instruction.id,e.target.value)}
                    />
                    }
                </StyledBody>
            </Accordion.Item>

    )
}