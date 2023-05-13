import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { AppLayout } from "~/components";
import { apiInfosState } from "~/atoms/apiInfos";
import { AssetStatusBadge, AssetDetailModal } from "./components";
import { formatAssetHealthBg } from "~/utils/format";

export const DashboardRoute: NextPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [assets, setAssets] = useState<Asset[]>();
  const [selectedAsset, setSelectedAsset] = useState<Asset>();

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/tractian/fake-api/assets")
      .then((res) => res.json())
      .then((res) => {
        setAssets(res);
      });
  }, []);

  const handleSelectedAsset = (assetId: number) => {
    setSelectedAsset(assets?.find((asset) => asset.id === assetId));
    onOpen();
  };

  return (
    <AppLayout>
      <HStack px={5} alignItems={"flex-start"} flexWrap={"wrap"} w={"100%"}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {assets?.map((item, index) => (
            <GridItem
              w="100%"
              cursor={"pointer"}
              onClick={() => handleSelectedAsset(item.id)}
            >
              <VStack
                p={5}
                w={"350px"}
                bg={"#DCDCDC"}
                borderRadius={30}
                height={'300px'}
              >
                <Text
                  fontSize={"2xl"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                  whiteSpace={"nowrap"}
                >
                  {item.name}
                </Text>
                <HStack
                  pt={2}
                  w={"100%"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Image
                    alt=""
                    boxSize="120px"
                    src={item.image}
                    borderRadius={10}
                  />
                  <VStack alignItems={"flex-end"}>
                    <Text whiteSpace={"nowrap"}>
                      Health Score:{" "}
                      <b
                        style={{
                          color: formatAssetHealthBg(item.healthscore),
                        }}
                      >
                        {item.healthscore}
                      </b>
                    </Text>
                    <AssetStatusBadge status={item.status}>
                      <Text color="#FFF">{item.status}</Text>
                    </AssetStatusBadge>
                  </VStack>
                </HStack>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </HStack>
      <AssetDetailModal
        isOpen={isOpen}
        onClose={onClose}
        asset={selectedAsset}
      />
    </AppLayout>
  );
};
