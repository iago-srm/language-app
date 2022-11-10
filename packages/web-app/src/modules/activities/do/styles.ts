import styled from "styled-components";

export const Container = styled.div`
  min-width: 60%;
  max-width: 90%;
  margin: 0 auto;
  button {
    width: 60%;
    margin: 0 auto;
  }
  button.accordion-button {
    width: 100%;
  }
  .header-section {
    // background-color: pink;
    display: flex;
    justify-content: space-between;
    svg {
      font-size: 2rem;
    }
  }
  .icon-container {
    margin: 15px;

    cursor: pointer;
  }
`;
