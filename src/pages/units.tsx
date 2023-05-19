import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { UnitsRoute } from "~/modules/units";

import type { GetServerSideProps, NextPage } from "next";

const _Units: NextPage = UnitsRoute;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      "common",
      "modules/units",
    ])),
  },
});

export default _Units;
