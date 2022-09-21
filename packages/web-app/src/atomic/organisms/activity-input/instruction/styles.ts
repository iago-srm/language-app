import styled from 'styled-components';

export const InstructionModalContentContainer = styled.div`
    textarea {
        width: 80%;
        padding: 10px;
        margin: 10px;
        display: block;
    }
    & > label {
        display: block;
    }
`;

export const OptionsContainer = styled.div`
    & > label {
        cursor: pointer;
    }
`;

export const ButtonsContainer = styled.div`
    width: 80%;
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button {
        // background-color: pink;
        width: 40%;
    }
`;