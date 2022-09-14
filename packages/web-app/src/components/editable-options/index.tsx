import styled from 'styled-components';
import { Icons } from '@components';

const NewItemButtonStyled = styled.button`
    width: 100%;
    span {
        font-size: 1.2rem;
    }
`;

export const NewInstructionButton = ({ children, ...rest }) => {
    return (
        <NewItemButtonStyled {...rest}>
            <span>+</span>
            {children}
        </NewItemButtonStyled>
    )
}

export const EditableOptionContainer = styled.div`
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
    button {
        font-size: 1.2rem;
        padding: 3px;
    }
`;

export const EditableOption = ({ text, onClickEdit, onClickRemove, item }) => {
    return (
        <EditableOptionContainer >
            <p>{text}</p>
            <button onClick={() => onClickEdit(item)}>
                <Icons.EDIT />
            </button>
            <button onClick={() => onClickRemove(item)}>
                <Icons.DELETE />
            </button>
        </EditableOptionContainer>
    )
}

interface IEditableOptionsProps<T> {
    options: T[];
    onClickEdit: (item: T) => any;
    onClickRemove: (item: T) => any;
    onClickNew: () => any;
}

export function EditableOptions<T extends { text: string }>({ 
    options, onClickEdit, onClickRemove, onClickNew 
}: IEditableOptionsProps<T>) {
    return (
        <>
        {options.map((option, i) => (
            <EditableOption 
              key={i} 
              item={option}
              onClickEdit={onClickEdit} 
              onClickRemove={onClickRemove} 
              text={option.text}
            />
          ))}
          <NewInstructionButton onClick={onClickNew}>
            Novo
          </NewInstructionButton>
        </>
    )
}