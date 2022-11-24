import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading = () => (
  <SpinnerContainer>
    <Spinner animation="border" role="status"></Spinner>
  </SpinnerContainer>
);
