import { IUnit } from "~/types/api";
import { SideMenu } from "../SideMenu";
import { useRecoilState } from "recoil";
import { unitsState } from "~/atoms/units";
import { useTranslation } from "next-i18next";
import { accountState } from "~/atoms/account";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  Box,
  Divider,
  HStack,
  Select,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Head from "next/head";
import {
  CarrouselCards,
  WorkOrdersChart,
} from "~/modules/dashboard/components";

interface AppLayoutProps {
  isLogin?: boolean;
}

export const AppLayout: React.FC<PropsWithChildren<AppLayoutProps>> = ({
  children,
  isLogin,
}) => {
  const { t } = useTranslation("common");
  const [, setCompany] = useState<any>();

  useEffect(() => {
    if (!isLogin) {
      fetch("https://my-json-server.typicode.com/tractian/fake-api/companies")
        .then((res) => res.json())
        .then((res) => {
          const companiesOptions: any = [];

          res.map((item: any) =>
            companiesOptions.push({
              value: item.id,
              name: item.name,
            })
          );

          setCompany(companiesOptions);
        });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Tractian | Dashboard</title>
      </Head>
      <Stack
        w={"100%"}
        height={"100vh"}
        overflow={"hidden"}
        p={{ base: 2, md: 8, lg: 8 }}
        bg="rgba(236, 236, 236, 0.8)"
      >
        <HStack
          w={"100%"}
          height={"100%"}
          borderRadius={20}
          position={"relative"}
          alignItems={"flex-start"}
        >
          {!isLogin && <SideMenu />}
          <Stack
            w={"100%"}
            h={"100%"}
            overflowY={"scroll"}
            overflowX={"hidden"}
            sx={{
              "*::-webkit-scrollbar": {
                width: "5px",
              },
              "*::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
              "*::-webkit-scrollbar-thumb": {
                borderRadius: 2,
                backgroundColor: "#242424",
              },
            }}
          >
            {children}
          </Stack>

          <VStack
            p={2}
            m={2}
            h="100%"
            bg="#FFF"
            w="400px"
            hidden
            borderRadius={20}
            boxShadow={"0px 0px 10px rgba(0,0,0,.08)"}
          >
            <Stack h="100%" w="100%">
              <CarrouselCards />
            </Stack>
            <Stack h="100%" w="100%">
              <WorkOrdersChart />
            </Stack>
          </VStack>

          {/* <HStack top={10} right={10} hidden={isLogin} position={"absolute"}> */}
          {/* <HStack top={10} right={10} hidden={true} position={"absolute"}>
            <Box>
              <Text color="#FFF">
                {t("unit")}: {unit?.name}
              </Text>
            </Box>
            <Divider orientation="vertical" />
            <Select w={"250px"} color="#FFF" border={"none"} cursor={"pointer"}>
              {company?.map((item: any) => (
                <option value={item.value}>{item.name}</option>
              ))}
            </Select>
          </HStack> */}
        </HStack>
      </Stack>
    </>
  );
};
