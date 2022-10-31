import ReactSelect from "react-select";
import { format, deFormat } from "./helpers";
import { getStyles } from "./styles";
import { useColorTheme } from "@contexts";

export const MultiSelect = ({ options, onChange, value }) => {
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
