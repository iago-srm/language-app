import styled from 'styled-components';

const ActionButtonStyled = styled.button<{selected: boolean}>`
  display: inline-block;
  padding: 20px 0;
  margin: 100px auto;
  width: 100%;
  border: 2px solid black;
  background-color: ${({selected, theme}) => selected ? theme.colors.primary : 'inherit'};
  color: ${({selected, theme}) => selected ? theme.colors.text : 'inherit'};
  border-radius: 5px;
`;

export const ActionButton = ({ children, selected, ...rest }) => {
  return (
    <ActionButtonStyled selected={selected} {...rest}>{children}</ActionButtonStyled>
  )
}
