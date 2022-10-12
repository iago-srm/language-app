import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components';

const InstructionsContainerStyled = styled.div`
    padding: 20px;
`;

export const InstructionsContainer = ({ children }) => {
    return (
        <InstructionsContainerStyled>
        <Accordion defaultActiveKey={"0"} alwaysOpen>
       {children}
      </Accordion>
      </InstructionsContainerStyled>
    )
}