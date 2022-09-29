import styled from 'styled-components';

export const FilterContainer = styled.div`
    width: 100%;
    padding: 5px;
`;

export const FiltersContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(14, 1fr);
    min-height: 10vh;
    ${FilterContainer}.title {
        grid-column: span 4;
    }
    ${FilterContainer}.topics {
        grid-column: span 8;
    }
    ${FilterContainer}.cefr {
        grid-column: span 2;
    }
    ${FilterContainer}.content-type {
        grid-column: span 3;
    }
`;



export const FiltersDrawerMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({theme}) => theme.colors.primary};
    p {
        padding: 15px;
        border: none;
        background-color: inherit;
        color: inherit;
        margin: 0;
    }
    svg {
        padding: 5px 10px;
        font-size: 2rem;
        cursor: pointer;
    }
`;

export const FiltersDrawer = styled.div`
    width: 100%;
    border-bottom: 1px solid ${({theme}) => theme.colors.accent};
    background-color: ${({theme}) => theme.colors.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;