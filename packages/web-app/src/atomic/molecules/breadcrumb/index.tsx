import styled from "styled-components";

const BreadCrumbStyled = styled.div<{ color: string }>`
  background-color: ${({ color }) => color || "inherit"};
  display: inline-block;
  padding: 5px;
  border-radius: 3px;
  margin: 0 3px;
  color: black;
`;

export const BreadCrumb = ({ color, children }) => {
  return <BreadCrumbStyled color={color}>{children}</BreadCrumbStyled>;
};
