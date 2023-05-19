import { useTranslation } from "next-i18next";
import {
  Text,
  Input,
  HStack,
  Select,
  VStack,
  Checkbox,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { useMemo, useState } from "react";
import { usersState } from "~/atoms/users";
import { RightSideModal } from "~/components";

interface CreateWorkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateWorkOrderModal: React.FC<CreateWorkOrderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [users] = useRecoilState(usersState);
  const { t } = useTranslation(["modules/dashboard", "common"]);
  const [assignedUsers, setAssignedUsers] = useState<number[]>([]);

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
  }, [users, assignedUsers]);

  return (
    <>
      <RightSideModal
        isOpen={isOpen}
        onClose={onClose}
        title={t("new_work_order")}
        _footer={{
          text: "Create work order",
          hide: false,
        }}
      >
        <VStack w="100%">
          <FormControl>
            <FormLabel>{t("common:title")}</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>{t("common:description")}</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>{t("common:status")}</FormLabel>
            <Select>
              <option>{t("toDo")}</option>
              <option>{t("inProgress")}</option>
              <option>{t("completed")}</option>
            </Select>
          </FormControl>
          <VStack alignItems={"flex-start"} w="100%">
            <Text my={2} fontSize={"xl"} fontWeight={"semibold"} w="100%">
              {t("details.assignedUsers")}:
            </Text>
            {assignedUsersList}
          </VStack>
        </VStack>
      </RightSideModal>
    </>
  );
};
