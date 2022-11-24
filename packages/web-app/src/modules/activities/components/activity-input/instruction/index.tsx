import { useEffect, useState } from "react";
import {
  RadioMenu,
  FormButton,
  Modal,
  Icons,
  NewItemButton,
  SquareButton,
  Input,
} from "@atomic";
import { InstructionType, Instruction } from "@model";
import { Translations, Labels } from "@locale";
import {
  InstructionModalContentContainer,
  OptionContainer,
  ButtonsContainer,
  ButtonContainer,
} from "./styles";

interface IInstructionModalProps {
  onClose: () => any;
  instructionUnderEdit?: any;
  setUpstreamInstruction: (instruction) => any;
}

const emptyInstruction: Instruction = {
  text: "",
  type: InstructionType.TEXT,
  textAnswer: "",
  optionsAnswers: [],
  options: [],
  id: "",
};

export const InstructionModal = ({
  onClose,
  instructionUnderEdit,
  setUpstreamInstruction,
}: IInstructionModalProps) => {
  const [instruction, setInstruction] = useState(emptyInstruction);

  useEffect(() => {
    if (instructionUnderEdit) setInstruction(instructionUnderEdit);
  }, [instructionUnderEdit]);

  // TODO: currently allows no correct alternatives
  const saveChanges = () => {
    if (
      instruction.type === InstructionType.OPTIONS &&
      instruction.options.length < 2
    ) {
      alert(
        "Instruções de alternativas devem conter pelo menos duas alternativas"
      );
      return;
    }
    if (instructionUnderEdit && !instruction.text) {
      alert(
        "Instrução não pode ter texto vazio. Se deseja removê-la, clique no botão de remover."
      );
      return;
    }
    if (!instruction.text) {
      alert(
        "Instrução não pode ter texto vazio. Para cancelar a criação, clique em cancelar."
      );
      return;
    } else if (instruction.text) {
      const instructionToSend = instruction.id
        ? instruction
        : { ...instruction, id: Date.now() };
      if (instructionToSend.type === InstructionType.TEXT) {
        instructionToSend.options = undefined;
        instructionToSend.optionsAnswers = undefined;
      }
      setUpstreamInstruction(instructionToSend);
    }
    onClose();
  };
  const onChangeInstructionText = (e) =>
    setInstruction((s) => ({ ...s, text: e }));
  const onChangeInstructionAnswer = (e) =>
    setInstruction((s) => ({ ...s, textAnswer: e }));
  const onChangeInstructionType = (e) => {
    // changing to text instruction type
    if (
      e === InstructionType.TEXT &&
      instruction.type === InstructionType.OPTIONS
    ) {
      setInstruction((s) => ({ ...s, type: e }));
    } // changing to options instruction type
    else if (
      e === InstructionType.OPTIONS &&
      instruction.type === InstructionType.TEXT
    ) {
      // if(instruction.textAnswer && !confirm("Deseja mudar de tipo de instrução? A resposta já inserida será perdida")) return;
      setInstruction((s) => ({
        ...s,
        type: e,
        optionsAnswers: [],
        options: s.options || [],
      }));
    }
  };
  // really necessary to use id here? why not just index?
  const setNewOption = (option) => {
    const currentOptions = [...instruction.options];
    const optionIndex = currentOptions.findIndex((opt) => opt.id === option.id);
    currentOptions[optionIndex] = option;
    setInstruction((s) => ({ ...s, options: currentOptions }));
  };

  const onChangeCorrectOption = (option) => {
    const currentAnswers = [...instruction.optionsAnswers];

    if (!option.isCorrect) {
      const currentOptionIndex = currentAnswers.findIndex(
        (answer) => answer === option.id
      );
      currentAnswers.splice(currentOptionIndex, 1);
    } else {
      currentAnswers.push(option.id);
    }
    setNewOption(option);
    setInstruction((s) => ({ ...s, optionsAnswers: currentAnswers }));
  };

  const onAddOption = () => {
    setInstruction((s) => ({
      ...s,
      options: [
        ...instruction.options,
        {
          id: Date.now().toString(),
          text: "",
          isCorrect: false,
        },
      ],
    }));
  };

  const onRemoveOption = (option) => {
    const currentOptions = [...instruction.options];

    const currentOptionIndex = currentOptions.findIndex(
      (opt) => opt.id === option.id
    );
    currentOptions.splice(currentOptionIndex, 1);

    setInstruction((s) => ({ ...s, options: currentOptions }));
  };

  return (
    <Modal
      header={`${instructionUnderEdit ? "Edit" : "Add"} instruction`}
      onClose={onClose}
    >
      <InstructionModalContentContainer>
        <label>
          {/* {Translations[language][Labels.DASHBOARD]} */}
          Instruction Text
          <textarea
            value={instruction.text}
            onChange={(e) => onChangeInstructionText(e.target.value)}
          />
        </label>
        Instruction Type
        <InstructionTypeSelectionForm
          value={instruction.type}
          onChange={(e) => onChangeInstructionType(e)}
        />
        {instruction.type === InstructionType.OPTIONS ? (
          <>
            {instruction.options.map((option, i) => (
              <OptionContainer key={i}>
                <Input
                  value={option.text}
                  onChange={(e: any) =>
                    setNewOption({ ...option, text: e.target.value })
                  }
                />
                <label>
                  Correct option?
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) =>
                      onChangeCorrectOption({
                        ...option,
                        isCorrect: !option.isCorrect,
                      })
                    }
                  />
                </label>
                <SquareButton onClick={() => onRemoveOption(option)}>
                  <Icons.DELETE />
                </SquareButton>
              </OptionContainer>
            ))}
            <ButtonContainer>
              <NewItemButton onClick={onAddOption}>New option</NewItemButton>
            </ButtonContainer>
          </>
        ) : (
          <>
            <h6>Suggested answer</h6>
            <textarea
              value={instruction.textAnswer}
              onChange={(e) => onChangeInstructionAnswer(e.target.value)}
            />
          </>
        )}
      </InstructionModalContentContainer>
      <ButtonsContainer>
        <FormButton variant="secondary" onClick={onClose}>
          Cancel
        </FormButton>
        <FormButton variant="primary" onClick={saveChanges}>
          Save changes
        </FormButton>
      </ButtonsContainer>
    </Modal>
  );
};

export const InstructionTypeSelectionForm = ({ value, onChange }) => {
  return (
    <RadioMenu
      value={value}
      onChange={onChange}
      options={[
        { value: InstructionType.TEXT, label: "Text" },
        { value: InstructionType.OPTIONS, label: "Options" },
      ]}
    />
  );
};
