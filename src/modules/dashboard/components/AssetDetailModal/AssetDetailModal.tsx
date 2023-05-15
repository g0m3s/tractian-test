import {
  Text,
  Radio,
  Stack,
  VStack,
  Select,
  RadioGroup,
  InputGroup,
  Image,
  HStack,
} from "@chakra-ui/react";
import enUS from "date-fns/locale/en-US";
import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { useMutation } from "@apollo/client";
import { useTranslation } from "next-i18next";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { RightSideModal } from "~/components";
import { AssetStatusBadge } from "../AssetStatusBadge";

interface AssetsDetailModalProps {
  asset?: Asset;
  isOpen: boolean;
  onClose: () => void;
}

export const AssetDetailModal: React.FC<AssetsDetailModalProps> = ({
  asset,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation(["modules/reports", "common"]);

  // {
  //   "assignedUserIds": [
  //     1,
  //     2,
  //     3
  //   ],
  //   "companyId": 1,
  //   "healthHistory": [
  //     {
  //       "status": "inOperation",
  //       "timestamp": "2022-12-01T00:00:00.000Z"
  //     },
  //     {
  //       "status": "inDowntime",
  //       "timestamp": "2022-12-08T00:00:00.000Z"
  //     },
  //     {
  //       "status": "inOperation",
  //       "timestamp": "2022-12-15T00:00:00.000Z"
  //     },
  //     {
  //       "status": "inAlert",
  //       "timestamp": "2022-12-22T00:00:00.000Z"
  //     },
  //     {
  //       "status": "unplannedStop",
  //       "timestamp": "2022-12-29T00:00:00.000Z"
  //     }
  //   ],
  //   "healthscore": 70,
  //   "id": 1,
  // },

  return (
    <>
      <RightSideModal
        isOpen={isOpen}
        onClose={onClose}
        title={`${t("asset_detail")}`}
        _footer={{
          hide: true,
          text: t("request_report"),
          onClick: () => alert(""),
        }}
      >
        <Image alt={asset?.name} src={asset?.image} borderRadius={10} />
        <Text mt={5} textAlign={"center"} fontWeight={"bold"} fontSize={"3xl"}>
          {asset?.name}
        </Text>
        <Text mt={5} fontSize={"xl"}>
          {t("metrics")}:
        </Text>
        <Text>
          <b>{t("totalCollectsUptime")}</b> :{" "}
          {asset?.metrics.totalCollectsUptime}
        </Text>
        <Text>
          <b>{t("lastUptimeAt")}</b> :{" "}
          {asset?.metrics.lastUptimeAt &&
            format(
              new Date(new Date(parseISO(asset.metrics.lastUptimeAt))),
              "MMM dd, yyyy",
              {
                locale: enUS,
              }
            )}
        </Text>
        <Text>
          <b>{t("totalUptime")}</b> : {asset?.metrics.totalUptime}
        </Text>
        <Text fontSize={"xl"} mt={3}>
          {t("more_details")}
        </Text>
        <HStack>
          <b>{t("sensors")}:</b>{" "}
          {asset?.sensors.map((item) => (
            <Text>{item},</Text>
          ))}
          {asset?.specifications.maxTemp && (
            <>
              <b>{t("maxTemp")}:</b>
              <Text>{asset?.specifications.maxTemp},</Text>
            </>
          )}
          {asset?.specifications.power && (
            <>
              <b>{t("power")}:</b>
              <Text>{asset?.specifications.power},</Text>
            </>
          )}
          {asset?.specifications.rpm && (
            <>
              <b>{t("rpm")}:</b>
              <Text>{asset?.specifications.rpm}</Text>
            </>
          )}
        </HStack>
        <HStack>
          <Text fontWeight={"bold"}>{t("status")}:</Text>
          <AssetStatusBadge status={asset?.status}>
            <Text color="#FFF">{asset?.status}</Text>
          </AssetStatusBadge>
        </HStack>

        <Text>
          {" "}
          <b>{t("model")}:</b> {asset?.model}
        </Text>

        {/* <Text>
          {" "}
          <b>{t("unitId")}:</b> {asset?.unitId}
        </Text> */}
      </RightSideModal>
    </>
  );
};
