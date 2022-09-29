import styled from 'styled-components';

export const ActivityCardContainer = styled.div`
    min-width: 80%;
    max-width: 90%;
    min-height: 100px;
    background-color: ${({theme}) => theme.colors.secondary};
    color: ${({theme}) => theme.colors.text};
    border-radius: 8px;
    margin: 10px auto;
    padding: 10px;
    cursor: pointer;
    :hover {
        transition: 0.5s ease-in-out;
        transform: scale(1.1);
    }
    h3{}
    p{}
    
`;

// export const 
