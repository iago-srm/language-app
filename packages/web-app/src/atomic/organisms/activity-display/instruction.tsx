import Accordion from 'react-bootstrap/Accordion';
import { TopicsColors, CEFRColors, Instruction as InstructionModel } from '@model';
import { RadioMenu, CheckboxMenu } from '@atomic';
import styled from 'styled-components';
import { IGetActivity } from '@language-app/common-core';

const ResponseTextArea = styled.textarea`
    width: 100%;
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
    return ( <Accordion.Item eventKey={`${index}`}>
                <Accordion.Header>{instruction.text}</Accordion.Header>
                <Accordion.Body>
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
                    // instruction.options.map((option, i) => (
                    //     <label>
                    //         {option.text}
                    //         <input type="radio" key={i}/>
                    //     </label>
                    // ))
                    : 
                    <ResponseTextArea 
                        value={instruction.answer}
                        onChange={(e) => instruction.onChange(instruction.id,e.target.value)}
                    />
                    }
                </Accordion.Body>
            </Accordion.Item>
    )
}