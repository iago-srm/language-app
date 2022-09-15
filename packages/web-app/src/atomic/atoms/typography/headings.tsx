import styled, { css } from 'styled-components';
import {
    TypographySizes,
    TypographyWeights
} from './definitions.enum';

type HeadingProps = {
    // color?: keyof Colors
    size?: keyof typeof TypographySizes
    fontWeight?: keyof typeof TypographyWeights
    level?: 1 | 2 | 3 | 4 | 5 | 6
  }

export const Heading = styled.h1.attrs<HeadingProps>(({level}) => ({
    as: `h${level}`
}))<HeadingProps>`${({ 
    // color, 
    size, 
    fontWeight, 
    theme
}) => css`
        color: ${theme.colors.accent};
        size: ${TypographySizes[size] || TypographySizes.medium};
        fontWeight: ${TypographyWeights[fontWeight] || TypographyWeights.normal}
    `}
`;