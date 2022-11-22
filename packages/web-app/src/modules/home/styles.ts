import styled from "styled-components";

export const Container = styled.div`
  width: 98vw;
  margin: 0 auto;

  .main-large {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .main-small {
    display: flex;
    flex-direction: column-reverse;
  }

  .main-section {
    width: 100%;
    padding: 20px;
    height: 90vh;
    .title {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h1 {
        font-size: 4rem;
      }
      p {
        font-size: 2rem;
      }
    }
    .video {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .section-title {
    font-style: italic;
  }

  .sticky-title {
    position: sticky;
    top: 50%;
    height: 100px;
  }

  .single-section {
    display: grid;
    grid-template-rows: auto;
    width: 98%;
    margin: 50px auto;
    justify-items: center;
    // align-items: center;

    img {
      margin: 20px;
    }
  }

  .left {
    grid-template-columns: 2fr 1fr;
  }

  .right {
    grid-template-columns: 1fr 2fr;
  }

  .section-small {
    h3 {
      margin: 100px auto;
    }
  }

  .section2-small {
    display: flex;
    flex-direction: column-reverse;
  }

  .imgs-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      cursor: pointer;
    }
  }
`;
