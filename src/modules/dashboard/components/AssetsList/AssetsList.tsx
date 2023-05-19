import {
  Text,
  Image,
  HStack,
  VStack,
  GridItem,
  SimpleGrid,
  useBreakpointValue,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { IAsset } from "~/types/api";
import { useRecoilState } from "recoil";
import * as Highcharts from "highcharts";
import { Maximize2 } from "react-feather";
import { unitsState } from "~/atoms/units";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { generateOptions } from "~/utils/utils";
import { AssetStatusBadge } from "../AssetStatusBadge";
import HighchartsReact from "highcharts-react-official";

interface AssetsListProps {
  assets?: IAsset[] | null;
  handleSelectedAsset: (_: number) => void;
}

export const AssetsList: React.FC<AssetsListProps> = (props) => {
  const { assets, handleSelectedAsset } = props;
  const [units] = useRecoilState(unitsState);
  const { t } = useTranslation("modules/dashboard");
  const columns = useBreakpointValue({ base: 1, md: 3 });
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const isMobile = useBreakpointValue({ base: true, md: false, lg: false });

  const userUnit = useCallback(
    (unitId: number) => !!units?.find(({ id }) => id === unitId),
    [units]
  );

  const color = useColorModeValue("#242424", "#FFF");
  const bg = useColorModeValue("#FFF", "rgb(24, 26, 27)");

  return (
    <>
      <Text
        mb={4}
        w="100%"
        color={color}
        fontSize={"2xl"}
        textAlign={"start"}
        fontWeight={"bold"}
      >
        {t("assets_list")}
      </Text>

      <SimpleGrid w="100%" columns={[1, 2, 3]} gap={5}>
        {assets?.map((item) => (
          <VStack
            p={5}
            w={"100%"}
            bg={bg}
            borderRadius={30}
            border="1px solid rgba(255, 255, 255, .08)"
            boxShadow={"0px 0px 10px rgba(0,0,0,.08)"}
          >
            <Text
              color={color}
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
                boxSize={{ base: "90px", md: "120px", lg: "120px" }}
              />
              <HighchartsReact
                options={generateOptions({
                  color: color,
                  isMobile: isMobile,
                  status: item.status,
                  value: item.healthscore,
                  title: isMobile ? t("health") : t("health_score"),
                })}
                highcharts={Highcharts}
                ref={chartComponentRef}
              />
            </HStack>

            <HStack opacity={0.8} pt={1} hidden={userUnit(item.unitId)}>
              <Text fontWeight={"semibold"} fontSize={"sm"} color="red">
                {t("outsider_asset")}
              </Text>
            </HStack>

            <HStack pt={3} justifyContent={"space-between"} w="100%">
              <HStack opacity={0.5}>
                <Text fontSize={"sm"}>{t("common:show_more")}</Text>
                <Maximize2 opacity={0.5} size={12} />
              </HStack>
              <AssetStatusBadge status={item.status} />
            </HStack>
          </VStack>
        ))}
      </SimpleGrid>
    </>
  );
};
