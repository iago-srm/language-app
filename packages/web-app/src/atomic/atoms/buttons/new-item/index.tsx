import styled from "styled-components";

const NewItemButtonStyled = styled.button`
  width: 80%;
  margin: 0 auto;
  border: none;
  display: inline-block;
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};

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
  );
};
