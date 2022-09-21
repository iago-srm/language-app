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
    value: string;
    onChange: () => any;
    options: { value: string, label: string }[];
    vertical?: boolean;
}
export const CheckboxMenu = ({ value, onChange, options, vertical }: ICheckboxProps) => {
    return (
        <CheckboxFormStyled vertical={vertical}>
        {options.map((option, i) => (
            <label key={i}>
                <input
                type="checkbox"
                value={option.value}
                checked={value && value.includes(option.value)}
                onChange={onChange}
                />
                {option.label}
            </label>
        ))}
      </CheckboxFormStyled>
    )
}