import {
  Text,
  Button,
  HStack,
  VStack,
  Checkbox,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { IWorkOrder } from "~/types/api";
import { usersState } from "~/atoms/users";
import { useTranslation } from "next-i18next";
import { Maximize2, Plus } from "react-feather";
import { WorkOrdersDetailModal } from "./components";
import { CreateWorkOrderModal } from "../CreateWorkOrderModal";

interface WorkOrdersProps {
  items: IWorkOrder[];
  tasksStatus: "toDo" | "inProgress" | "completed";
}

export const WorkOrders: React.FC<WorkOrdersProps> = ({
  tasksStatus,
  items,
}) => {
  const [users] = useRecoilState(usersState);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: newOrderIsOpen,
    onClose: onCloseOrder,
    onOpen: onOpenOrder,
  } = useDisclosure();
  const { t } = useTranslation(["modules/dashboard", "common"]);
  const [selectedOrder, setSelectedOrder] = useState<IWorkOrder>();
  const [activeCardIds, setActiveCardIds] = useState<Array<number>>([]);

  const generateInfos = () => {
    switch (tasksStatus) {
      case "toDo":
        return {
          title: t("toDo"),
          bg: "rgba(255,255,255,.8)",
          // bg: "rgba(255,255,255,.8)",
        };
      case "inProgress":
        return {
          title: t("inProgress"),
          bg: "orange",
          // bg: "rgba(255,255,0,.8)",
        };
      case "completed":
        return {
          title: t("completed"),
          bg: "green",
          // bg: "rgba(50,205,50, .8)",
        };

      default:
        return;
    }
  };

  return (
    <VStack minW={"300px"} w={"300px"}>
      <Text mb={4} fontSize={"xl"} fontWeight={"semibold"} color="#242424">
        {generateInfos()?.title}
      </Text>
      {items.map((task) => (
        <VStack
          p={5}
          w="100%"
          borderRadius={20}
          cursor={"pointer"}
          bg={generateInfos()?.bg}
          boxShadow={"0px 0px 10px rgba(0,0,0,.08)"}
          onClick={() => {
            setSelectedOrder(task);
            onOpen();
          }}
        >
          <Text color='#FFF' fontSize={"xl"} fontWeight={"bold"}>
            {task.title}
          </Text>
          <VStack w="100%">
            {task.checklist.map((checklistItem) => (
              <HStack w={"100%"} alignItems={"flex-start"}>
                <Checkbox color='#FFF' isChecked={checklistItem.completed}>
                  {checklistItem.task}
                </Checkbox>
              </HStack>
            ))}
          </VStack>
          <Collapse in={!!activeCardIds.find((item) => item === task.id)}>
            <VStack
              pt={2}
              w="100%"
              fontSize={"sm"}
              transition={"all 1s linear"}
            >
              <Text w="100%" fontWeight={"semibold"} fontSize={"sm"}>
                {t("description")}:
              </Text>
              <Text fontSize={"sm"}>{task.description}</Text>
              <Text fontWeight={"semibold"} w="100%">
                {t("assignedUsers")}:
              </Text>
              <Text w="100%">
                {task.assignedUserIds.map(
                  (uId, index) =>
                    users &&
                    `${users[uId]?.name}${
                      index !== task.assignedUserIds.length - 1 ? ", " : ""
                    }`
                )}
              </Text>
            </VStack>
          </Collapse>
          <HStack
            opacity={0.5}
            hidden={!!activeCardIds.find((item) => item === task.id)}
          >
            <Text color='#FFF' fontSize={"sm"}>{t("common:show_more")}</Text>
            <Maximize2 size={12} />
          </HStack>
        </VStack>
      ))}
      <Button onClick={() => onOpenOrder()} w="100%">
        <Plus />
        <Text >{t("add_task")}</Text>
      </Button>
      <WorkOrdersDetailModal
        isOpen={isOpen}
        onClose={onClose}
        workOrder={selectedOrder}
      />
      <CreateWorkOrderModal onClose={onCloseOrder} isOpen={newOrderIsOpen} />
    </VStack>
  );
};
