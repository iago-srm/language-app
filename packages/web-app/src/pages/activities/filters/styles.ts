import styled from 'styled-components';

export const FiltersContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 4fr 1fr;
    height: 7vh;
`;

export const FilterContainer = styled.div`
    width: 100%;
    padding: 5px;
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
    background-color: ${({theme}) => theme.colors.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;