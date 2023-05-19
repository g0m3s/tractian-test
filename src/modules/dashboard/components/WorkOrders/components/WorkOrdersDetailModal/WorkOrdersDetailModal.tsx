import { useTranslation } from "next-i18next";
import {
  Text,
  HStack,
  VStack,
  Divider,
  Checkbox,
  useColorModeValue,
} from "@chakra-ui/react";

import { IWorkOrder } from "~/types/api";
import { useRecoilState } from "recoil";
import { usersState } from "~/atoms/users";
import { RightSideModal } from "~/components";
import { useEffect, useMemo, useState } from "react";
import { workOrdersState } from "~/atoms/workOrders";

interface WorkOrdersDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  workOrder?: IWorkOrder;
}

export const WorkOrdersDetailModal: React.FC<WorkOrdersDetailModalProps> = ({
  workOrder,
  isOpen,
  onClose,
}) => {
  const [users] = useRecoilState(usersState);
  const bg = useColorModeValue("#FFF", "rgb(24, 26, 27)");
  const { t } = useTranslation(["modules/dashboard", "common"]);
  const [assignedUsers, setAssignedUsers] = useState<number[]>();
  const [workOrders, setWorkOrders] = useRecoilState(workOrdersState);

  const handleAssignedUsers = (userId: number) => {
    if (!!assignedUsers?.find((id) => id === userId)) {
      setAssignedUsers(assignedUsers?.filter((id) => id !== userId));
    } else {
      setAssignedUsers([...assignedUsers!, userId]);
    }
  };

  const assignedUsersList = useMemo(() => {
    return users?.map((user) => (
      <HStack key={user.id}>
        <Checkbox
          onChange={() => handleAssignedUsers(user.id)}
          isChecked={assignedUsers?.includes(user.id)}
        >
          <Text>{user.name}</Text>
        </Checkbox>
      </HStack>
    ));
  }, [workOrder, users, assignedUsers]);

  useEffect(() => {
    setAssignedUsers(workOrder?.assignedUserIds);
  }, [workOrder]);

  return (
    <>
      <RightSideModal
        isOpen={isOpen}
        onClose={onClose}
        title={t("details.work_order_detail")}
        _footer={{
          text: "Change to next Status",
          hide: workOrder?.status === "completed",
          onClick() {
            if (!workOrder) return;
            const nextStatus = () => {
              switch (workOrder.status) {
                case "todo":
                  return "in progress";
                case "in progress":
                  return "completed";
                default:
                  return "todo";
              }
            };

            setWorkOrders([
              ...workOrders!.filter(({ id }) => id !== workOrder.id),
              {
                ...workOrder,
                status: nextStatus(),
              },
            ]);
            onClose();
          },
        }}
      >
        <VStack w="100%" bg={bg} alignItems={"flex-start"}>
          <Text my={5} fontSize={"xl"} fontWeight={"semibold"}>
            {workOrder?.title}
          </Text>
          <VStack w="100%">
            {workOrder?.checklist.map((checklistItem) => (
              <HStack w={"100%"} alignItems={"flex-start"}>
                <Checkbox isChecked={checklistItem.completed}>
                  <Text fontSize={"xl"}>{checklistItem.task}</Text>
                </Checkbox>
              </HStack>
            ))}
          </VStack>

          <Divider my={5} />

          <Text mb={2} fontSize={"xl"} fontWeight={"semibold"} w="100%">
            {t("details.status")}:
          </Text>
          <Text w="100%">{workOrder?.status}</Text>

          <Divider my={5} />

          <Text mb={2} fontSize={"xl"} w="100%" fontWeight={"semibold"}>
            {t("common:description")}:
          </Text>
          <Text>{workOrder?.description}</Text>

          <Divider my={5} />

          <Text mb={2} fontSize={"xl"} fontWeight={"semibold"} w="100%">
            {t("details.assignedUsers")}:
          </Text>
          <VStack alignItems={"flex-start"} mt={1}>
            {assignedUsersList}
          </VStack>
        </VStack>
      </RightSideModal>
    </>
  );
};
