import styled from 'styled-components';

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
        p {
            padding: 10px 20px 20px 20px;
            margin: 0;
        }
    }
    :hover {
        transition: 0.5s ease-in-out;
        transform: scale(1.1);
    }


`;  