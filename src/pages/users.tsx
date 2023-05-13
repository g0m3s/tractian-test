import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { UsersRoute } from "~/modules/users";

import type { GetServerSideProps, NextPage } from "next";

const _Users: NextPage = UsersRoute;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      "common",
      "modules/users",
    ])),
  },
});

export default _Users;
