import Accordion from "react-bootstrap/Accordion";
import { Instruction as InstructionModel } from "@model";
import { RadioMenu, CheckboxMenu } from "@atomic";
import styled from "styled-components";
import { Translations, Labels } from "@locale";
import { useLanguage } from "@contexts";

const ResponseTextArea = styled.textarea`
  width: 100%;
  padding: 5px;
`;

const StyledHeader = styled(Accordion.Header)`
  .accordion-button {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
  }

  .accordion-button:focus {
    box-shadow: none;
  }
`;

const StyledBody = styled(Accordion.Body)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  .suggested-answer {
    h6 {
      font-style: italic;
    }
  }
`;

interface IInstructionWithHandler extends InstructionModel {
  answer: string | string[];
  onChange: (instructionId: string, newValue: string | string[]) => any;
}
interface IInstructionProps {
  instruction: IInstructionWithHandler;
  index: number;
  showAnswer?: boolean;
}

export const Instruction = ({
  instruction,
  index,
  showAnswer,
}: IInstructionProps) => {
  const { language } = useLanguage();

  return (
    <Accordion.Item eventKey={`${index}`}>
      <StyledHeader>{instruction.text}</StyledHeader>
      <StyledBody>
        {instruction.type === "OPTIONS" ? (
          instruction.optionsAnswers.length === 1 ? (
            <RadioMenu
              value={instruction.answer as string}
              onChange={(e) => instruction.onChange(instruction.id, e)}
              options={instruction.options.map((option) => ({
                value: option.id,
                label: option.text,
              }))}
              vertical={true}
              correctOptionsIds={
                showAnswer && instruction.optionsAnswers.map(({ id }) => id)
              }
            />
          ) : (
            <CheckboxMenu
              values={instruction.answer as string[]}
              onChange={(e) => instruction.onChange(instruction.id, e)}
              options={instruction.options.map((option) => ({
                value: option.id,
                label: option.text,
              }))}
              vertical={true}
              correctOptionsIds={
                showAnswer && instruction.optionsAnswers.map(({ id }) => id)
              }
            />
          )
        ) : (
          <>
            <ResponseTextArea
              value={instruction.answer}
              onChange={(e) =>
                instruction.onChange(instruction.id, e.target.value)
              }
            />
            {showAnswer && instruction.textAnswer && (
              <div className="suggested-answer">
                <hr />
                <h6>
                  {Translations[language][Labels.Activity.SUGGESTED_ANSWER]}
                </h6>
                <p>{instruction.textAnswer}</p>
              </div>
            )}
          </>
        )}
      </StyledBody>
    </Accordion.Item>
  );
};
