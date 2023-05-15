import type { GetServerSideProps, NextPage } from 'next';

const _Index: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    locale: true,
    permanent: true,
    destination: '/login',
  },
});

export default _Index;
