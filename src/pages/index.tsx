import type { GetServerSideProps, NextPage } from 'next';

const _Index: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/dashboard',
    permanent: true,
    locale: true,
  },
});

export default _Index;
