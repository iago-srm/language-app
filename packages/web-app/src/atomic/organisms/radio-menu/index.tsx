import styled from 'styled-components';

export const RadioMenuFormStyled = styled.form`
    label {
        padding: 3px 11px;
    }
`;

interface IRadioMenuProps {
    value: string;
    onChange: () => any;
    options: { value: string, label: string }[]
}
export const RadioMenu = ({ value, onChange, options }: IRadioMenuProps) => {
    return (
        <RadioMenuFormStyled>
        {options.map((option, i) => (
            <label key={i}>
                <input
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                />
                {option.label}
            </label>
        ))}
      </RadioMenuFormStyled>
    )
}