import styled from 'styled-components';

export const Container = styled.nav`
    width: 100vw;
    height: 10vh;
    background-color: black;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const Button = styled.button`
    display: inline-block;
    padding: 3vh;
    &hover {
        background-color: grey;
    }
`;
  