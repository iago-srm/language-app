import styled from 'styled-components';
import { Icons } from '@atomic/atoms';
import { NewItemButton, SquareButton } from '@atomic/molecules';


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
            <SquareButton onClick={() => onClickEdit(item)}>
                <Icons.EDIT />
            </SquareButton>
            <SquareButton onClick={() => onClickRemove(item)}>
                <Icons.DELETE />
            </SquareButton>
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
          <NewItemButton onClick={onClickNew}>
            Novo
          </NewItemButton>
        </>
    )
}