import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { DashboardRoute } from '~/modules/dashboard';

import type { GetServerSideProps, NextPage } from 'next';

const _Dashboard: NextPage = DashboardRoute;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      'common',
      'modules/dashboard',
    ])),
  },
});

export default _Dashboard;
