import { Container, Row, Col } from "@atomic";
import React from "react";
import styled from "styled-components";

export const ResponsiveCenteredPageContent = ({ children }) => {
  return (
    <Container fluid="sm" className="responsive-container">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>{children}</Col>
      </Row>
    </Container>
  );
};

const TwoColumnsContainer = styled(Container)`
  .offset-1 {
    margin-bottom: 20px;
  }
`;

export const TwoColumns = ({ children }) => {
  return (
    <TwoColumnsContainer fluid="sm" style={{ marginTop: "20px" }}>
      <Row>
        {React.Children.map(children, (child) => (
          <Col xs={{ span: 10, offset: 1 }} sm={{ span: 6, offset: 0 }}>
            {child}
          </Col>
        ))}
      </Row>
    </TwoColumnsContainer>
  );
};
