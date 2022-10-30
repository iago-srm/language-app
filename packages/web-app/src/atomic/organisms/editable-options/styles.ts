import styled from "styled-components";

export const EditableOptionContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 3px;
  padding: 5px;
  margin: 10px auto;
  p {
    margin: 0;
    padding: 2px 5px;
    line-height: 30px;
    width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  button {
    font-size: 1.2rem;
    padding: 3px;
  }
`;

export const EditableOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 150px;
`;
