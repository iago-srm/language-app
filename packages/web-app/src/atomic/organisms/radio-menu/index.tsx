import styled from "styled-components";

export const RadioMenuFormStyled = styled.div<{ vertical: boolean }>`
  label {
    display: ${({ vertical }) => (vertical ? "block" : "inline-block")};
    padding: 3px 11px;
  }
  input {
    margin-right: 6px;
  }
`;

interface IRadioMenuProps {
  value: string;
  onChange: (args) => any;
  options: { value: string; label: string }[];
  vertical?: boolean;
}
export const RadioMenu = ({
  value,
  onChange,
  options,
  vertical,
}: IRadioMenuProps) => {
  return (
    <RadioMenuFormStyled vertical={vertical}>
      {options.map((option, i) => (
        <label key={i}>
          <input
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
          />
          {option.label}
        </label>
      ))}
    </RadioMenuFormStyled>
  );
};
