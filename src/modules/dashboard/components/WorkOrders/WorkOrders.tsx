import { IWorkOrder } from "~/types/api";
import { useTranslation } from "next-i18next";
import { Checkbox, Collapse, HStack, Text, VStack } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { assetsState } from "~/atoms/assets";
import { useMemo, useState } from "react";
import { usersState } from "~/atoms/users";
import { Maximize2 } from "react-feather";

interface WorkOrdersProps {
  items: IWorkOrder[];
  tasksStatus: "toDo" | "inProgress" | "completed";
}

export const WorkOrders: React.FC<WorkOrdersProps> = ({
  tasksStatus,
  items,
}) => {
  const [activeCardIds, setActiveCardIds] = useState<Array<number>>([]);
  const [assets] = useRecoilState(assetsState);
  const [users, setUsers] = useRecoilState(usersState);
  const { t } = useTranslation(["modules/dashboard", "common"]);

  const generateInfos = () => {
    switch (tasksStatus) {
      case "toDo":
        return {
          title: t("toDo"),
          bg: "rgba(255,255,255,.8)",
        };
      case "inProgress":
        return {
          title: t("inProgress"),
          bg: "rgba(255,255,0,.8)",
        };
      case "completed":
        return {
          title: t("completed"),
          bg: "rgba(50,205,50, .8)",
        };

      default:
        return;
    }
  };

  const handleActiveCardIds = (id: number) => {
    if (!activeCardIds.find((item) => item === id)) {
      setActiveCardIds((prev) => [...prev, id]);
    }
  };

  return (
    <VStack w={"300px"}>
      <Text color="#FFF">{generateInfos()?.title}</Text>
      {items.map((task) => (
        <VStack
          p={5}
          w="100%"
          borderRadius={5}
          cursor={"pointer"}
          bg={generateInfos()?.bg}
          boxShadow={"0px 0px 10px rgba(0,0,0,.1)"}
          onClick={() => handleActiveCardIds(task.id)}
        >
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {task.title}
          </Text>
          <VStack w="100%">
            {task.checklist.map((checklistItem) => (
              <HStack w={"100%"} alignItems={"flex-start"}>
                <Checkbox isChecked={checklistItem.completed}>
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
          <HStack opacity={.5} hidden={!!activeCardIds.find((item) => item === task.id)}>
            <Text fontSize={'sm'}>{t("common:show_more")}</Text>
            <Maximize2 size={12} />
          </HStack>
        </VStack>
      ))}
    </VStack>
  );
};
