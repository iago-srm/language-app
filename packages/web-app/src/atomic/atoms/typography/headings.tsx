import styled, { css } from "styled-components";
import { TypographySizes, TypographyWeights } from "./definitions.enum";

type HeadingProps = {
  // color?: keyof Colors
  color?: string;
  size?: keyof typeof TypographySizes;
  fontWeight?: keyof typeof TypographyWeights;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const Heading = styled.h1.attrs<HeadingProps>(({ level }) => ({
  as: level ? `h${level}` : "h1",
}))<HeadingProps>`
  ${({
    // color,
    size,
    fontWeight,
    theme,
    color,
  }) => css`
    color: ${color || theme.colors.text};
    size: ${TypographySizes[size] || TypographySizes.medium};
    font-weight: ${TypographyWeights[fontWeight] || TypographyWeights.bold};
  `}
`;
