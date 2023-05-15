import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accountState } from "~/atoms/account";
import { useTranslation } from "react-i18next";
import { Grid, User, Settings } from "react-feather";
import tractionLogo from "~/assets/logos/tractianLogo.png";
import { Box, Divider, HStack, Image, Text, VStack } from "@chakra-ui/react";

export const SideMenu: React.FC = () => {
  const { push } = useRouter();
  const [account, _] = useRecoilState(accountState);
  const { t } = useTranslation("common");

  const SIDE_MENU_ITEMS = [
    {
      icon: Grid,
      isSelected: true,
      path: "/dashboard",
      name: t("dashboard"),
    },
    {
      icon: User,
      path: "/users",
      name: t("users"),
    },
    {
      icon: Settings,
      path: "/dashboard",
      name: t("settings"),
    },
  ];

  return (
    <>
      <VStack height={"100%"} justifyContent={"space-between"}>
        <VStack
          pt={1}
          px={5}
          w="270px"
          height={"100%"}
          borderRadius={10}
        >
          <img
            alt="Tractian logo"
            src={tractionLogo.src}
            style={{ width: "120px", marginBottom: "10px" }}
          />
          <Image
            boxSize="100px"
            alt=""
            borderRadius="full"
            src="https://bit.ly/dan-abramov"
          />
          <Text color="#FFF" fontWeight={"semibold"}>
            {account?.name}
          </Text>
          <VStack w={"100%"} pt={10}>
            {SIDE_MENU_ITEMS.map((item) => (
              <HStack
                onClick={() => push(item.path)}
                sx={{
                  bg: item.isSelected ? "rgb(22, 119, 255)" : "transparent",
                  ":hover": {
                    bg: "rgba(22, 119, 255, .15)",
                  },
                }}
                p={5}
                w="100%"
                borderRadius={10}
                cursor={"pointer"}
                justifyContent={"flex-start"}
              >
                <Box color={"#FFF"} as={item.icon} />
                <Text color={"#FFF"}>{item.name}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
        <HStack gap={3} opacity={0.5} color="#FFF">
          <Text cursor={"pointer"}>En-US</Text>
          <Divider opacity={0.15} borderRadius={10} orientation="vertical" />
          <Text cursor={"pointer"}>Pt-BR</Text>
        </HStack>
      </VStack>
      <Divider opacity={0.15} borderRadius={10} orientation="vertical" />
    </>
  );
};
