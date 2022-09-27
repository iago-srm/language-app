import { Icons } from '@atomic/atoms';
import { NewItemButton, SquareButton } from '@atomic';
import { EditableOptionContainer, EditableOptionsContainer } from './styles';

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
        <EditableOptionsContainer>
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
        </EditableOptionsContainer>
    )
}