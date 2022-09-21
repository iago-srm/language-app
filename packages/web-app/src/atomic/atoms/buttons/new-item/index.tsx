import styled from 'styled-components';

const NewItemButtonStyled = styled.button`
    width: 80%;
    padding: 5px;
    // margin: 0 auto;
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