import styled from 'styled-components';

export const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 80%;
  margin-right: 10%;
  margin-left: 10%;
  margin-top: 10px;
  margin-bottom: 10px;

  :before,
  :after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${({theme}) => theme.colors.text};
  }

  :not(:empty)::before {
    margin-right: .25em;
  }

  :not(:empty)::after {
    margin-left: .25em;
  }
`;
