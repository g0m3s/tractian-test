import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LoginRoute } from '~/modules/login';

import type { GetServerSideProps, NextPage } from 'next';

const _Login: NextPage = LoginRoute;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      'common',
      'modules/login',
    ])),
  },
});

export default _Login;
