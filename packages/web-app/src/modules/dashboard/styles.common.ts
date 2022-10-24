import styled from 'styled-components';

export const ButtonsContainer = styled.div`
    display: flex;
    margin: 10px auto;
    width: 80%;
    flex-wrap: wrap;
    justify-content: space-around;
    button {
      min-width: 30%;
      margin: 10px;
    }
    @media (max-width: 780px) {
        flex-direction: column;
        align-items: center;
        button {
            min-width: 60%;
            margin: 20px;
        }
    }
`;

export const Container = styled.div`
    width: 100%;

    h3 {
        text-align: left;
        padding: 10px;
    }


`;

// export const ContainerWhatFor = styled.div`
//   width: 100vw;

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;

//   h1 {
//     font-size: 54px;
//     margin-top: 40px;
//   }

//   p {
//     margin-top: 24px;
//     font-size: 24px;
//     line-height: 32px;
//   }

//   img {
//   }
// `
