import {
  Grid,
  Text,
  Image,
  HStack,
  VStack,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useMemo, useRef } from "react";
import { IAsset } from "~/types/api";
import * as Highcharts from "highcharts";
import { Maximize2 } from "react-feather";
import { useTranslation } from "react-i18next";
import { generateOptions } from "~/utils/utils";
import { AssetStatusBadge } from "../AssetStatusBadge";
import HighchartsReact from "highcharts-react-official";
import { accountState } from "~/atoms/account";
import { useRecoilState } from "recoil";
import { unitsState } from "~/atoms/units";

interface AssetsListProps {
  assets?: IAsset[] | null;
  handleSelectedAsset: (_: number) => void;
}

export const AssetsList: React.FC<AssetsListProps> = (props) => {
  const { assets, handleSelectedAsset } = props;
  const { t } = useTranslation("modules/dashboard");
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const isMobile = useBreakpointValue({ base: true, md: false, lg: false });
  const [account] = useRecoilState(accountState);
  const [units] = useRecoilState(unitsState);

  const userUnit = useMemo(() => units?.find(({ id }) => account?.unitId), []);

  return (
    <>
      <Text
        w="100%"
        mb={4}
        color="#242424"
        fontSize={"2xl"}
        textAlign={"start"}
        fontWeight={"bold"}
      >
        {t("assets_list")}
      </Text>

      <Grid
        gap={5}
        w={"100%"}
        h={"100%"}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
      >
        {assets?.map((item) => (
          <GridItem
            w="100%"
            flex={1}
            cursor={"pointer"}
            onClick={() => handleSelectedAsset(item.id)}
          >
            <VStack
              p={5}
              w={"100%"}
              bg={"#FFF"}
              borderRadius={30}
              boxShadow={"0px 0px 10px rgba(0,0,0,.08)"}
            >
              <Text
                color="#242424"
                fontSize={"xl"}
                fontWeight={"bold"}
                textAlign={"center"}
                whiteSpace={"nowrap"}
              >
                {item.name}
              </Text>
              <HStack h={"100%"} w={"100%"}>
                <Image
                  alt=""
                  src={item.image}
                  borderRadius={10}
                  fallbackSrc="https://via.placeholder.com/150"
                  boxSize={{ base: "100px", md: "120px", lg: "120px" }}
                />
                <HighchartsReact
                  options={generateOptions({
                    isMobile: isMobile,
                    status: item.status,
                    value: item.healthscore,
                    title: isMobile ? t("health") : t("health_score"),
                  })}
                  highcharts={Highcharts}
                  ref={chartComponentRef}
                />
              </HStack>

              <HStack pt={1} hidden={item.unitId === userUnit?.id}>
                <Text fontWeight={'semibold'} fontSize={'sm'} color="red">{t('outsider_asset')}</Text>
              </HStack>

              <HStack pt={3} justifyContent={"space-between"} w="100%">
                <HStack opacity={0.5}>
                  <Text fontSize={"sm"}>{t("common:show_more")}</Text>
                  <Maximize2 opacity={0.5} size={12} />
                </HStack>
                <AssetStatusBadge status={item.status} />
              </HStack>
            </VStack>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
