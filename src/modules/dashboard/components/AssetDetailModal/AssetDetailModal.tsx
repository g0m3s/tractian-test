import { useMemo, useState } from "react";
import enUS from "date-fns/locale/en-US";
import { format, parseISO } from "date-fns";
import { useTranslation } from "next-i18next";
import { Text, Image, HStack, Divider, Checkbox } from "@chakra-ui/react";

import { IAsset } from "~/types/api";
import { useRecoilState } from "recoil";
import { unitsState } from "~/atoms/units";
import { usersState } from "~/atoms/users";
import { RightSideModal } from "~/components";
import { companyState } from "~/atoms/company";
import { AssetStatusBadge } from "../AssetStatusBadge";
import { FormattedText, HealthHistoryChart } from "./components";

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
  const [users] = useRecoilState(usersState);
  const [units] = useRecoilState(unitsState);
  const [company] = useRecoilState(companyState);
  const { t } = useTranslation(["modules/dashboard", "common"]);
  const [assignedUsers, setAssignedUsers] = useState<number[]>();

  const convertHoursToDays = (hours?: number): string => {
    if (!hours) return "";

    const hoursPerDay = 24;

    const days = Math.floor(hours / hoursPerDay);
    const remainingHours = hours % hoursPerDay;

    const daysText = days === 1 ? "day" : "days";
    const hoursText = remainingHours === 1 ? "hour" : "hours";

    const formattedHours = remainingHours.toFixed(1);

    return `${days} ${daysText} and ${formattedHours} ${hoursText}`;
  };

  const handleAssignedUsers = (userId: number) => {
    if (!!assignedUsers?.find((id) => id === userId)) {
      setAssignedUsers(assignedUsers?.filter((id) => id !== userId));
    } else {
      setAssignedUsers([...assignedUsers!, userId]);
    }
  };

  const assignedUsersList = useMemo(() => {
    return asset?.assignedUserIds?.map((id) => {
      const currentUser = users?.find((user) => user.id === id);
      if (currentUser) {
        return (
          <HStack key={currentUser.id}>
            <Checkbox
              onChange={() => handleAssignedUsers(currentUser.id)}
              isChecked={asset?.assignedUserIds.includes(currentUser.id)}
            >
              <Text>{currentUser.name}</Text>
            </Checkbox>
          </HStack>
        );
      }
    });
  }, [users, asset]);

  return (
    <>
      <RightSideModal
        isOpen={isOpen}
        onClose={onClose}
        title={`${t("asset_detail")}`}
        _footer={{
          text: "",
          hide: true,
        }}
      >
        <Image alt={asset?.name} src={asset?.image} borderRadius={10} />
        <Text mt={5} textAlign={"center"} fontWeight={"bold"} fontSize={"3xl"}>
          {asset?.name}
        </Text>

        <Text mb={2} mt={5} fontSize={"xl"}>
          {t("details.metrics")}:
        </Text>
        <Text>
          <b>{t("details.totalCollectsUptime")}</b> :{" "}
          {convertHoursToDays(asset?.metrics.totalCollectsUptime)}
        </Text>
        <Text>
          <b>{t("details.lastUptimeAt")}</b> :{" "}
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
          <b>{t("details.totalUptime")}</b> :{" "}
          {convertHoursToDays(asset?.metrics.totalUptime)}
        </Text>

        <Divider my={5} />

        <Text mb={2} fontSize={"xl"}>
          {t("more_details")}
        </Text>

        <FormattedText
          description={t("details.maxTemp")}
          content={`${asset?.specifications.maxTemp}°C`}
        />
        <FormattedText
          description={t("details.power")}
          content={asset?.specifications.power}
        />
        <FormattedText
          description={t("details.rpm")}
          content={asset?.specifications.rpm}
        />

        {/* FIXME: CHANGE TO NAME */}
        <FormattedText
          description={t("common:unitId")}
          content={units?.find(({ id }) => id === asset?.unitId)?.name}
        />
        {/* FIXME: CHANGE TO NAME */}
        <FormattedText
          // content={asset?.companyId}
          content={company?.name}
          description={t("common:company")}
        />

        <FormattedText
          hide={!asset?.model}
          content={asset?.model}
          description={t("details.model")}
        />

        <HStack>
          <Text fontWeight={"bold"}>{t("details.status")}:</Text>
          <AssetStatusBadge hideTag status={asset?.status} />
        </HStack>

        <HStack>
          <b>{t("details.sensors")}:</b>{" "}
          {asset?.sensors.map((item) => (
            <Text>{item},</Text>
          ))}
        </HStack>

        <Divider my={5} />

        <Text mb={2} fontSize={"xl"}>
          {t("details.assignedUsers")}
        </Text>
        {assignedUsersList}

        <Divider my={5} />
        <HealthHistoryChart healthHistory={asset?.healthHistory} />
      </RightSideModal>
    </>
  );
};
