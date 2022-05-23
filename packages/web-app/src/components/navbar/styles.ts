import styled from 'styled-components';

export const Container = styled.nav`
  width: 100vw;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
`;

export const ButtonStyled = styled.div`
  display: inline-block;
  padding: 3vh;
  &:hover {
    color: black;
    background-color: #e1e1e1;
    cursor: pointer;
  }
  height: 8vh;
`;
