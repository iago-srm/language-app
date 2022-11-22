import ReactSelect from "react-select";
import {
  getStyles,
  SelectedOptionIconContainer,
  SelectedOptionLabelContainer,
} from "./styles";
import { ISelectProps } from "./types";
import { useColorTheme } from "@contexts";

export const SingleSelect = ({
  options,
  onChange,
  value,
  selectedIcon,
}: ISelectProps) => {
  const { theme } = useColorTheme();
  return (
    <ReactSelect
      formatOptionLabel={(option, context) => {
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
      value={value || []}
      styles={getStyles(theme)}
      onChange={onChange}
    />
  );
};
