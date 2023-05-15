import { IUnit } from "~/types/api";
import { SideMenu } from "../SideMenu";
import { useRecoilState } from "recoil";
import { unitState } from "~/atoms/unit";
import { useTranslation } from "next-i18next";
import { accountState } from "~/atoms/account";
import { PropsWithChildren, useEffect, useState } from "react";
import { Box, Divider, HStack, Select, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";

interface AppLayoutProps {
  isLogin?: boolean;
}

export const AppLayout: React.FC<PropsWithChildren<AppLayoutProps>> = ({
  children,
  isLogin,
}) => {
  const { t } = useTranslation("common");
  const [company, setCompany] = useState<any>();
  const [account] = useRecoilState(accountState);
  const [unit, setUnit] = useRecoilState(unitState);

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

  useEffect(() => {
    if (!isLogin) {
      fetch("https://my-json-server.typicode.com/tractian/fake-api/units")
        .then((res) => res.json())
        .then((res: IUnit[]) => {
          const unit = res.find((item) => item.id === account?.unitId);
          unit && setUnit(unit);
        });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Tractian | Dashboard</title>
      </Head>
      <Stack
        p={10}
        height={"100vh"}
        overflow={"hidden"}
        bg="rgba(255, 255, 255, 0.87)"
      >
        <HStack
          p={10}
          pt={"100px"}
          bg="#242424"
          height={"100%"}
          borderRadius={20}
          position={"relative"}
          alignItems={"flex-start"}
          boxShadow={"0px 0px 10px rgba(0,0,0,.5)"}
        >
          {!isLogin && <SideMenu />}
          <Stack
            w={"100%"}
            h={"100%"}
            overflowY={"scroll"}
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
          <HStack top={10} right={10} hidden={isLogin} position={"absolute"}>
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
          </HStack>
        </HStack>
      </Stack>
    </>
  );
};
