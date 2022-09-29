import { CheckboxFormStyled } from './styles';

interface ICheckboxProps {
    values: string[];
    onChange: (args?: any) => any;
    options: { value: string, label: string }[];
    vertical?: boolean;
    label?: string;
}


export const CheckboxMenu = ({ values, onChange, options, vertical, label }: ICheckboxProps) => {
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
        <p>{label}</p>
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