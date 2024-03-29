import styled from "styled-components";

export const Container = styled.div`
  width: 98vw;
  margin: 0 auto;
  overflow-x: hidden;

  .warning {
    color: red;
    padding: 10px;
    text-align: center;
  }
  .main-section {
    display: flex;
    flex-direction: column-reverse;
    // inside the media-query what happens when it's big
    @media (min-width: ${({ theme }) => theme.responsiveBreakpoint}px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
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
    text-align: center;
    @media (min-width: ${({ theme }) => theme.responsiveBreakpoint}px) {
      position: sticky;
      top: 50%;
      height: 100px;
    }
  }

  .single-section {
    h3 {
      margin: 100px auto;
    }
    @media (min-width: ${({ theme }) => theme.responsiveBreakpoint}px) {
      display: grid;
    }
    width: 98%;
    margin: 50px auto;
    justify-items: center;
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

  .section2 {
    @media (max-width: ${({ theme }) => theme.responsiveBreakpoint}px) {
      display: flex;
      flex-direction: column-reverse;
    }
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

  .end-section {
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .browse-activities {
      background-color: pink;
    }

    button {
      min-width: 30%;
      max-width: 80%;
      margin: 10px auto;
      a {
        text-decoration: none;
      }
    }
    .authenticate {
      padding: 10px;
      text-align: center;
      a {
        text-align: center;
        :hover {
          color: blue;
          text-decoration: underline;
        }
      }
    }
  }
`;
