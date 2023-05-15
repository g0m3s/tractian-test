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
import { IAsset } from "~/types/api";

interface AssetsDetailModalProps {
  asset?: IAsset;
  isOpen: boolean;
  onClose: () => void;
}

export const AssetDetailModal: React.FC<AssetsDetailModalProps> = ({
  asset,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation(["modules/dashboard", "common"]);

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
