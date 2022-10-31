import styled from "styled-components";
import { TopicsColors, CEFRColors } from "@model";

export const SelectedOptionIconContainer = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

export const SelectedOptionLabelContainer = styled.span`
  display: inline-block;
  margin: 0 5px;
  color: ${({ theme }) => theme.colors.text};
`;

export const getStyles = (theme) => ({
  control: (styles) => ({
    ...styles,
    backgroundColor: theme.colors.secondary,
    border: "none",
    // borderColor: theme.colors.accent
  }),
  option: (styles) => {
    return {
      ...styles,
      color: theme.colors.text,
      backgroundColor: theme.colors.secondary,
      cursor: "pointer",
      "&:hover": {
        // color: theme.colors.accent,
        backgroundColor: theme.colors.primary,
      },
    };
  },
  menu: (styles) => ({
    ...styles,
    backgroundColor: theme.colors.secondary,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: theme.colors.accent,
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: theme.colors.accent,
  }),
  clearIndicator: (styles) => ({
    ...styles,
    color: theme.colors.accent,
  }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: TopicsColors[data.value],
      color: "black",
    };
  },
});
