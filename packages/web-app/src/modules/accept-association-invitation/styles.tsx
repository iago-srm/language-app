import styled from 'styled-components';
import { Heading } from '@atomic';
import { PageContainer, FlexCentered } from '@styles';

export const Container = styled(PageContainer)`
  padding-top: 20px;
`
export const ErrorContainer = styled.p`
  color: red;
`;

const InstructorImageContainer = styled(FlexCentered)`
  img {
    width: 300px;
    object-fit: cover;
    border-radius: 50%;
  }
  margin: 20px 0;

`;

const InstructorDetailsContainer = styled.div`
  h6 {
    text-align: center;
  }
  margin: 30px;

`;

export const InstructorDetails = ({ instructor }) => {
  return (
    <InstructorDetailsContainer>      
    <InstructorImageContainer><img src={instructor.image} /> </InstructorImageContainer>
    <Heading level={6}>{instructor.name}</Heading>
    </InstructorDetailsContainer>

  )
}