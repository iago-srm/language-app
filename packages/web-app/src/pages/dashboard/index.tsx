import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import { GetServerSideProps } from "next";

import { MainPage } from "@modules/dashboard";

export default MainPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "language-app.token": token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  // const payload = jwt.verify(
  //   token,
  //   process.env.NEXT_PUBLIC_AUTH_TOKEN_SECRET
  // ) as any;

  return {
    props: {},
  };
};
