import styled from 'styled-components';
import { cardHoverAnimationCss } from '@styles';

export const DashboardButtonStyled = styled.button`
    border: none;
    background-color: ${({theme}) => theme.colors.secondary};
    color: ${({theme}) => theme.colors.text};
    a {
        svg {
            font-size: 3rem;
            display: block;
            margin: 0 auto;
            padding: 20px;
        }
        h3 {
            padding: 10px 20px 20px 20px;
            margin: 0;
            text-align: center;
        }
    }
    ${cardHoverAnimationCss}


`;  