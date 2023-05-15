import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import {
  Grid,
  Text,
  Image,
  HStack,
  VStack,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import { IAsset } from "~/types/api";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { AppLayout } from "~/components";
import * as Highcharts from "highcharts";
import { unitState } from "~/atoms/unit";
import { Maximize2 } from "react-feather";
import { useTranslation } from "react-i18next";
import { generateOptions } from "~/utils/utils";
import { apiInfosState } from "~/atoms/apiInfos";
import HighchartsReact from "highcharts-react-official";
import { AssetStatusBadge, AssetDetailModal } from "./components";

export const DashboardRoute: NextPage = () => {
  const { push } = useRouter();
  const { t } = useTranslation("common");
  const [unit] = useRecoilState(unitState);
  const [assets, setAssets] = useState<IAsset[]>();
  const [account, _] = useRecoilState(apiInfosState);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedAsset, setSelectedAsset] = useState<IAsset>();
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/tractian/fake-api/assets")
      .then((res) => res.json())
      .then((res: IAsset[]) => {
        const filteredAssets = res.filter((item) => item.unitId === unit?.id);
        setAssets(filteredAssets);
      });
  }, [unit]);

  // useEffect(() => {
  //   fetch("https://my-json-server.typicode.com/tractian/fake-api/workorders")
  //     .then((res) => res.json())
  //     .then((res: IAsset[]) => {
  //       const filteredAssets = res.filter((item) => item.unitId === unit?.id);
  //       setAssets(filteredAssets);
  //     });
  // }, [unit]);

  const handleSelectedAsset = (assetId: number) => {
    setSelectedAsset(assets?.find((asset) => asset.id === assetId));
    onOpen();
  };

  console.log('account', account);
  

  if (account === null) {
    push("/login");
  }

  return (
    <AppLayout>
      <HStack px={5} alignItems={"flex-start"} flexWrap={"wrap"} w={"100%"}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {assets?.map((item) => (
            <GridItem
              w="100%"
              cursor={"pointer"}
              onClick={() => handleSelectedAsset(item.id)}
            >
              <VStack
                p={5}
                w={"350px"}
                bg={"#FFF"}
                borderRadius={30}
                boxShadow={"0px 0px 10px rgba(0,0,0,.3)"}
              >
                <Text
                  color="#242424"
                  fontSize={"2xl"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  whiteSpace={"nowrap"}
                >
                  {item.name}
                </Text>
                <HStack pt={2} w={"100%"}>
                  <Image
                    alt=""
                    boxSize="120px"
                    src={item.image}
                    borderRadius={10}
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                  <HighchartsReact
                    options={generateOptions(
                      item.healthscore,
                      t("health_score"),
                      item.status
                    )}
                    highcharts={Highcharts}
                    ref={chartComponentRef}
                  />
                </HStack>

                <HStack pt={5} justifyContent={"space-between"} w="100%">
                  <HStack>
                    <Text>{t("show_more")}</Text>
                    <Maximize2 opacity={0.5} size={12} />
                  </HStack>
                  <AssetStatusBadge status={item.status}>
                    <Text color="#FFF">{item.status}</Text>
                  </AssetStatusBadge>
                </HStack>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </HStack>
      <VStack pt={5} alignItems={'flex-start'}>
        <Text fontWeight={'bold'} fontSize={'2xl'} color='#FFF'>{t('workorders')}</Text>
      </VStack>
      <AssetDetailModal
        isOpen={isOpen}
        onClose={onClose}
        asset={selectedAsset}
      />
    </AppLayout>
  );
};
