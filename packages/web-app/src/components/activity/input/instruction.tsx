import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { 
    Modal,
    RadioMenu,
    EditableOptions,
    Button
} from '@components';
import {
    InstructionType,
    Instruction
  } from '@model';

  const NewItemButtonStyled = styled.button`
    width: 100%;
    span {
        font-size: 1.2rem;
    }
`;

const NewItemButton = ({ children, ...rest }) => {
    return (
        <NewItemButtonStyled {...rest}>
            <span>+</span>
            {children}
        </NewItemButtonStyled>
    )
}

const InstructionModalContentContainer = styled.div`
    textarea {
        width: 80%;
        padding: 10px;
        margin: 10px;
        display: block;
    }
    & > label {
        display: block;
    }
`;

const OptionsContainer = styled.div`
    & > label {
        cursor: pointer;
    }
`;

interface IInstructionModalProps {
    onClose: () => any;
    instructionUnderEdit?: any;
    setUpstreamInstruction: (instruction) => any;
}

const emptyInstruction: Instruction = {
    text: "",
    type: InstructionType.TEXT,
    answer: "",
    options: [],
    id: ""
};

export const InstructionModal = ({ 
    onClose, 
    instructionUnderEdit,
    setUpstreamInstruction 
}: IInstructionModalProps) => {

    const [instruction, setInstruction] = useState(emptyInstruction);
    
    useEffect(() => {
        if(instructionUnderEdit) setInstruction(instructionUnderEdit);
    }, [instructionUnderEdit]);

    const saveChanges = () => {
        if(instructionUnderEdit && !instruction.text) {
            alert("Instrução não pode ter texto vazio. Se deseja removê-la, clique no botão de remover.");
            return;
        } else if(instruction.text) {
            const instructionToSend = instruction.id ? instruction : {...instruction, id: Date.now()};
            if(instructionToSend.type === InstructionType.TEXT) instructionToSend.options = undefined;
            setUpstreamInstruction(instructionToSend);
        }
        onClose();
    }
    const onChangeInstructionText = (e) => setInstruction(s => ({...s, text: e}));
    const onChangeInstructionAnswer = (e) => setInstruction(s => ({...s, answer: e}));
    const onChangeInstructionType = (e) => {
        if(e === InstructionType.TEXT && instruction.type === InstructionType.OPTIONS) {
            setInstruction(s => ({...s, type: e, answer: "" }));
        } else if(e === InstructionType.OPTIONS && instruction.type === InstructionType.TEXT) {
            if(instruction.answer && !confirm("Deseja mudar de tipo de instrução? A resposta já inserida será perdida")) return;
            setInstruction(s => ({
                ...s, 
                type: e, 
                answer: [],
                options: s.options || [] 
            }));
        }
    }
    // really necessary to use id here? why not just index?
    const onChangeOption = (option) => {
        const currentOptions = [...instruction.options];
        const optionIndex = currentOptions.findIndex(opt => opt.id === option.id);
        currentOptions[optionIndex] = option;
        console.log({currentOptions, option})
        setInstruction(s => ({...s, options: currentOptions }));
    }

    const onAddOption = () => {
        setInstruction(s => ({...s, options: [...instruction.options, { 
            id: Date.now().toString(), 
            text: "", 
            isCorrect: false 
        }] }));
    }

    return (
        <Modal 
          header={`${instructionUnderEdit ? "Editar" : "Adicionar"} instrução`} 
          onClose={onClose}
        >
            <InstructionModalContentContainer>
                <label>
                    Texto da Instrução
                    <textarea value={instruction.text} onChange={(e) => onChangeInstructionText(e.target.value)}/>
                </label>
                <label>
                    Tipo de Instrução
                    <InstructionTypeSelectionForm 
                    value={instruction.type} 
                    onChange={(e) => onChangeInstructionType(e.target.value)}/>
                </label>
                {instruction.type === InstructionType.OPTIONS 
                ? 
                <>
                {instruction.options.map((option,i) => (
                    <OptionsContainer>
                        <input value={option.text} onChange={(e) => onChangeOption({...option, text: e.target.value})}/>
                        <label>
                            Alternativa correta?
                            <input type="checkbox" checked={option.isCorrect} onChange={(e) => onChangeOption({...option, isCorrect: !option.isCorrect})}/>
                        </label>
                    </OptionsContainer>
                ))}
                <NewItemButton onClick={onAddOption}>
                    Nova alternativa
                </NewItemButton>
                </>
                :
                <>
                    <textarea value={instruction.answer} onChange={(e) => onChangeInstructionAnswer(e.target.value)}/>
                </>
            }
            </InstructionModalContentContainer>
          {/* <p>{JSON.stringify(instructionUnderEdit)}</p> */}
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Salvar alterações
          </Button>
        </Modal>
    )
}

export const InstructionTypeSelectionForm = ({ value, onChange }) => {
    return (
        <RadioMenu 
            value={value}
            onChange={onChange}
            options={[
                {value: InstructionType.TEXT, label: "Dissertativa"},
                {value: InstructionType.OPTIONS, label: "Alternativas"},
            ]}
        />
    )
}