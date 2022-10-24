import { Page } from "@modules/reset-password";

export default Page;

export async function getServerSideProps(ctx) {
  return {
    props: {...ctx.query}
  }
}
