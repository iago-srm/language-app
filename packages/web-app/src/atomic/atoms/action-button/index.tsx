import styled from 'styled-components';

const ActionButtonStyled = styled.button`
  display: inline-block;
  padding: 20px 0;
  width: 100%;
  hover {
    border: 3px solid ${({ theme }) => theme.colors.accent};  
    color: ${({ theme }) => theme.colors.accent};  
    background-color: ${({ theme }) => theme.colors.primary};  
  }
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
`;

export const ActionButton = ({ children, loading, ...rest }) => {
  return loading ?
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    :
    <ActionButtonStyled {...rest}>{children}</ActionButtonStyled>
  
}
