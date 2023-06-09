import { NextPage } from "next";
import { AppLayout } from "~/components";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import {
  Divider,
  HStack,
  Image,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { companyState } from "~/atoms/company";
import { useRecoilState } from "recoil";
import { unitsState } from "~/atoms/units";

export const UsersRoute: NextPage = () => {
  const { t } = useTranslation(["modules/users", "common"]);
  const [users, setUsers] = useState<any>();
  const [company] = useRecoilState(companyState);
  const [units] = useRecoilState(unitsState);
  const isMobile = useBreakpointValue({ base: true, md: false, lg: false });

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/tractian/fake-api/users")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      });
  }, []);

  return (
    <AppLayout>
      <VStack
        h="100%"
        bg="#FFF"
        w={"100%"}
        borderRadius={20}
        align={"flex-start"}
        p={{ base: 4, md: 8, lg: 8 }}
        boxShadow={"0px 0px 10px rgba(0,0,0,.1)"}
      >
        <Text
          mb={5}
          as="h2"
          color="#242424"
          fontSize={"3xl"}
          fontWeight={"bold"}
        >
          {t("list_of_users")}
        </Text>
        {users?.map((user: any) => (
          <HStack
            w={"100%"}
            borderRadius={10}
            bg="rgba(255, 255, 255, .8)"
            p={{ base: 2, md: 5, lg: 5 }}
            gap={{ base: 2, md: 5, lg: 5 }}
            boxShadow={"0px 0px 10px rgba(0,0,0,.08)"}
          >
            <Image
              alt=""
              borderRadius="full"
              boxSize={{ base: "30px", md: "50px", lg: "50px" }}
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            />
            <VStack w="40%" alignItems={"flex-start"}>
              <Text
                color="#242424"
                fontWeight={"semibold"}
                fontSize={{ base: "sm", md: "md", lg: "md" }}
              >
                {user.name}
              </Text>
              <Text
                color="#242424"
                m={"0 !important"}
                hidden={!isMobile}
                fontSize={{ base: "sm", md: "md", lg: "md" }}
              >
                {units?.find(({ id }) => id === user.unitId)?.name}
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md", lg: "md" }}
                m={"0 !important"}
                color="#242424"
              >
                {user.email}
              </Text>
            </VStack>
            <Divider hidden={isMobile} orientation="vertical" />
            <VStack hidden={isMobile} w="100%" alignItems={"flex-end"}>
              <Text color="#242424" fontWeight={"semibold"}>
                {t("common:company")}: {company?.name}
              </Text>
              <Text m={"0 !important"} color="#242424">
                {t("common:unit")}:{" "}
                {units?.find(({ id }) => id === user.unitId)?.name}
              </Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </AppLayout>
  );
};
