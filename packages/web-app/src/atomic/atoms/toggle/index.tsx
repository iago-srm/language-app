import Switch from "react-switch";
import { ToggleContainer } from "./styles";
import { useColorTheme } from "@contexts";

export const Toggle = ({ checked, onChange, label }) => {
  const { theme } = useColorTheme();

  return (
    <ToggleContainer>
      <label>
        <span>{label}</span>
        <Switch
          onChange={onChange}
          checked={checked}
          offColor={"#aaa"}
          onColor={theme.colors.secondary}
          onHandleColor={theme.colors.text}
          offHandleColor={theme.colors.text}
          checkedIcon={false}
          uncheckedIcon={false}
        />
      </label>
    </ToggleContainer>
  );
};
