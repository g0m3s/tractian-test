import { useMemo } from "react";
import { Tag, Text } from "@chakra-ui/react";
import { AssetStatus } from "~/types/api";
import { useTranslation } from "next-i18next";

export interface AssetStatusBadgeProps {
  hideTag?: boolean;
  status?: AssetStatus;
}

export const generateStatusTagColor = (status?: AssetStatus) => {
  switch (status) {
    case "inAlert":
      return "orange";
    case "inDowntime":
      return "red";
    case "inOperation":
      return "green";
    case "unplannedStop":
      return "red";
    default:
      return "grey";
  }
};

export const AssetStatusBadge: React.FC<AssetStatusBadgeProps> = ({
  status,
  hideTag,
}) => {
  const { t } = useTranslation("modules/dashboard");

  const bgColor = useMemo(() => {
    return generateStatusTagColor(status);
  }, [status]);

  const textInfos = useMemo(() => {
    switch (status) {
      case "inAlert":
        return {
          content: t("status.inAlert"),
          color: "orange",
        };
      case "inDowntime":
        return {
          content: t("status.inDowntime"),
          color: "red",
        };
      case "inOperation":
        return {
          content: t("status.inOperation"),
          color: "green",
        };
      case "unplannedStop":
        return {
          content: t("status.unplannedStop"),
          color: "red",
        };
      default:
        return {
          content: " - ",
          color: "grey",
        };
    }
  }, [status]);

  if (hideTag) {
    return (
      <Text color={textInfos.color}>
        {textInfos.content}
      </Text>
    );
  }

  return (
    <Tag
      bg={bgColor}
      fontSize={"xs"}
      borderRadius={"full"}
      fontWeight={"medium"}
    >
      <Text fontWeight={'semibold'} color="#FFF">{textInfos.content}</Text>
    </Tag>
  );
};
