import styled from 'styled-components';
import { PageContainer } from '@styles';

export const Container = styled(PageContainer)`
  a {
    text-decoration: underline;
    color: ${({theme}) => theme.colors.highlightedText};
    display: inline-block;
    margin-bottom: 10px;
  }
`

