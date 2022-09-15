import styled, { css } from 'styled-components';
import {
    TypographySizes,
    TypographyWeights
} from './definitions.enum';

type PProps = {
    fontWeight?: keyof typeof TypographyWeights
}
export const P = styled.p<PProps>`${({
    fontWeight, 
    theme,
}) => css`
        fontWeight: ${TypographyWeights[fontWeight] || TypographyWeights.normal}
        color: ${theme.colors.accent};
    `}
`;