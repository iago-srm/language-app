import styled from 'styled-components';

export const CheckboxFormStyled = styled.form<{vertical: boolean}>`
    label {
        display: ${({vertical}) => vertical ? 'block' : 'inline-block'};
        padding: 3px 11px;
    }
    input {
        margin-right: 6px;
    }
`;

interface ICheckboxProps {
    values: string[];
    onChange: (args?: any) => any;
    options: { value: string, label: string }[];
    vertical?: boolean;
}
export const CheckboxMenu = ({ values, onChange, options, vertical }: ICheckboxProps) => {
    const onClick = (e) => {
        const { value } = e.target;
        if(values.includes(value)) {
            const newValues = [...values];
            newValues.splice(values.findIndex(v => v === value),1);
            onChange(newValues);
        } 
        else {
            onChange([...values, value]);
        }
    }
    return (
        <CheckboxFormStyled vertical={vertical}>
        {options.map((option, i) => (
            <label key={i}>
                <input
                type="checkbox"
                value={option.value}
                checked={values && values.includes(option.value)}
                onChange={onClick}
                />
                {option.label}
            </label>
        ))}
      </CheckboxFormStyled>
    )
}