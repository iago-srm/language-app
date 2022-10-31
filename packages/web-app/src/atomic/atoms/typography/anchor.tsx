import Link from "next/link";
import styled from "styled-components";

const LinkStyled = styled.a`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.accent};
  display: inline-block;
  margin-bottom: 10px;
`;

export const Anchor = ({ href, children }) => {
  return (
    <Link passHref href={href}>
      <LinkStyled>{children}</LinkStyled>
    </Link>
  );
};
