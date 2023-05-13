import { NextPage } from "next";
import { AppLayout } from "~/components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider, HStack, Image, Text, VStack } from "@chakra-ui/react";

export const UsersRoute: NextPage = () => {
  const { t } = useTranslation(['modules/users', 'common']);
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/tractian/fake-api/users")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      });
  }, []);

  return (
    <AppLayout>
      <VStack p={10} w={"100%"} align={"flex-start"}>
        <Text mb={5} color="#FFF" as="h2" fontSize={"2xl"}>
          {t("list_of_users")}
        </Text>
        {users?.map((user: any) => (
          <HStack
            p={5}
            gap={5}
            w={"100%"}
            borderRadius={10}
            bg="rgba(255, 255, 255, .8)"
          >
            <Image
              alt=""
              boxSize="50px"
              borderRadius="full"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            />
            <VStack alignItems={"flex-start"}>
              <Text color="#242424" fontWeight={"semibold"}>
                {user.name}
              </Text>
              <Text m={"0 !important"} color="#242424">
                {user.email}
              </Text>
            </VStack>
            <Divider orientation="vertical" />
            <VStack w="100%" alignItems={"flex-end"}>
              <Text color="#242424" fontWeight={"semibold"}>
                {t("company_id")}: {user.companyId}
              </Text>
              <Text m={"0 !important"} color="#242424">
                {t("unity_id")}: {user.unitId}
              </Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </AppLayout>
  );
};
