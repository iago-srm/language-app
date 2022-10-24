import { Page } from '@modules/verify-account';

export default Page;

export async function getServerSideProps(ctx) {
    return {
      props: {...ctx.query}
    }
  }
  