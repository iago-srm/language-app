import ReactSelect from "react-select";
import { format, deFormat } from "./helpers";
import {
  getStyles,
  SelectedOptionIconContainer,
  SelectedOptionLabelContainer,
} from "./styles";
import { useColorTheme } from "@contexts";

interface IOptionType {
  label: string;
  value: string;
}

interface ISingleSelectProps {
  options: IOptionType[];
  onChange: (args: any) => any;
  value: IOptionType;
  selectedIcon?: any;
}
export const SingleSelect = ({
  options,
  onChange,
  value,
  selectedIcon,
}: ISingleSelectProps) => {
  const { theme } = useColorTheme();

  return (
    <ReactSelect
      formatOptionLabel={(option, context) => {
        // if(!value) return;
        if (context.selectValue.includes(option) && selectedIcon) {
          return (
            <>
              <SelectedOptionIconContainer>
                {selectedIcon}
              </SelectedOptionIconContainer>
              <SelectedOptionLabelContainer>
                {option.label}
              </SelectedOptionLabelContainer>
            </>
          );
        } else if (context.selectValue.includes(option)) {
          return (
            <SelectedOptionLabelContainer>
              {option.label}
            </SelectedOptionLabelContainer>
          );
        }
        return option.label;
      }}
      options={options}
      value={value}
      styles={getStyles(theme)}
      onChange={onChange}
    />
  );
};
