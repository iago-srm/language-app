import {
  Container,
  Row,
  Col,
} from '@atomic';

export const ResponsiveCenteredPageContent = ({ children }) => {
  return (
    <Container fluid="sm" className='responsive-container'>
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export const TwoColumns = ({ children }) => {
  return (
    <Container fluid="sm" style={{marginTop: '20px'}}>
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}
