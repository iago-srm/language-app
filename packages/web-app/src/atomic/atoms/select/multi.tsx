import ReactSelect from "react-select";
import { getStyles } from "./styles";
import { useColorTheme } from "@contexts";
import { ISelectProps } from "./types";

export const MultiSelect = ({ options, onChange, value }: ISelectProps) => {
  const { theme } = useColorTheme();

  return (
    <ReactSelect
      isMulti
      options={options}
      value={value}
      styles={getStyles(theme)}
      onChange={onChange}
    />
  );
};
