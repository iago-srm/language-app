import styled from 'styled-components';

const NewItemButtonStyled = styled.button`
    width: 100%;
    span {
        font-size: 1.2rem;
    }
`;

export const NewItemButton = ({ children, ...rest }) => {
    return (
        <NewItemButtonStyled {...rest}>
            <span>+</span>
            {children}
        </NewItemButtonStyled>
    )
}