import styled from 'styled-components';

const SelectablePanelStyled = styled.button<{selected: boolean}>`
  display: inline-block;
  padding: 20px 0;
  margin: 50px auto;
  width: 100%;
  border: 2px solid black;
  background-color: ${({selected, theme}) => selected ? theme.colors.primary : 'inherit'};
  color: ${({selected, theme}) => selected ? theme.colors.text : 'inherit'};
  border-radius: 5px;
`;

interface ISelectablePanelProps {
  selected: boolean;
  onClick: any;
  children: any;
}

export const SelectablePanel = ({ children, ...rest }: ISelectablePanelProps) => {
  return (
  // loading ?
  //     <div className="spinner-border" role="status">
  //       <span className="sr-only">Loading...</span>
  //     </div>
  //   :
    <SelectablePanelStyled {...rest}>{children}</SelectablePanelStyled>
  )
}
