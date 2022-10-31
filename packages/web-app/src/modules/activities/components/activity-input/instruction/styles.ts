import styled from "styled-components";

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

export const OptionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  & > label {
    cursor: pointer;
    padding: 5px;
    input {
      margin-left: 3px;
    }
  }
  & > input {
    width: 50%;
    margin: 10px 0;
  }
`;

export const ButtonContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  display: flex;
`;

export const ButtonsContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  button {
    width: 40%;
  }
`;
