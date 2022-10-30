import styled from "styled-components";

export const Separator = styled.div<{ margins?: string }>`
  display: flex;
  align-items: center;
  text-align: center;
  width: 80%;
  margin: 10px ${({ margins }) => (margins ? margins : "10%")};

  :before,
  :after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.accent};
  }

  :not(:empty)::before {
    margin-right: 0.25em;
  }

  :not(:empty)::after {
    margin-left: 0.25em;
  }
`;
