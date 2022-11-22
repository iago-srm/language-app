import styled from "styled-components";

export const Container = styled.div`
  min-width: 60%;
  max-width: 90%;
  margin: 0 auto;
  .header-section {
    display: flex;
    justify-content: space-between;
    svg {
      font-size: 2rem;
    }
  }
  .icon-container {
    margin: 15px;
  }
  p.feedback-placeholder {
    padding: 15px;
    font-style: italic;
  }
  p.feedback-text {
    padding: 15px;
  }
  textarea {
    padding: 10px;
    margin: 5px;
  }
  button {
    width: 60%;
    margin: 0 auto;
  }
  button.accordion-button {
    width: 100%;
  }
`;

export const InstructionsContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
