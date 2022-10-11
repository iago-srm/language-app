import Accordion from 'react-bootstrap/Accordion';
import { TopicsColors, CEFRColors, Instruction } from '@model';
import { RadioMenu, BreadCrumb, CheckboxMenu } from '@atomic';
import styled from 'styled-components';
import { IGetActivity } from '@language-app/common-core';

const ResponseTextArea = styled.textarea`
    width: 100%;
`;

// interface IInstructionWithHandler extends Instruction {
//     answer: string | string[];
//     onChange: (instructionId: string, newValue: string | string[]) => any;
// }
// interface IInstructionProps {
//     instructions: {
//         [id: string]: IInstructionWithHandler
//     }
// }

export const InstructionsContainer = ({ children }) => {
    return (
        <Accordion alwaysOpen>
       {children}
      </Accordion>
    )
}