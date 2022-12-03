import styled from "styled-components";

export const RadioMenuFormStyled = styled.div<{ vertical: boolean }>`
  label {
    display: ${({ vertical }) => (vertical ? "block" : "inline-block")};
    padding: 3px 11px;
  }
  .correct {
    background-color: #83f28fcc;
    border-radius: 3px;
    border: 1px solid green;
    margin-bottom: 5px;
  }
  ks input {
    margin-right: 6px;
  }
`;

interface IRadioMenuProps {
  value: string;
  onChange: (args) => any;
  options: { value: string; label: string }[];
  vertical?: boolean;
  correctOptionsIds?: string[];
}
export const RadioMenu = ({
  value,
  onChange,
  options,
  vertical,
  correctOptionsIds,
}: IRadioMenuProps) => {
  return (
    <RadioMenuFormStyled vertical={vertical}>
      {options.map((option, i) => (
        <label
          key={i}
          className={
            correctOptionsIds && correctOptionsIds.includes(option.value)
              ? "correct"
              : null
          }
        >
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
