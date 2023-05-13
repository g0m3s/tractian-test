import { useMemo } from "react";
import { Tag } from "@chakra-ui/react";

export interface AssetStatusBadgeProps {
  children: React.ReactNode;
  status?: AssetStatus;
}
export const AssetStatusBadge: React.FC<AssetStatusBadgeProps> = ({
  status,
  children,
}) => {
  const bgColor = useMemo(() => {
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
  }, [status]);

  return (
    <Tag
      bg={bgColor}
      fontSize={"xs"}
      borderRadius={"full"}
      fontWeight={"medium"}
    >
      {children}
    </Tag>
  );
};
