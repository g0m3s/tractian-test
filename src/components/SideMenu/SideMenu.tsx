import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useTranslation } from "next-i18next";
import { accountState } from "~/atoms/account";
import { Grid, User, Home } from "react-feather";
import tractionLogo from "~/assets/logos/tractianLogo.png";
import tractianShortLogo from "~/assets/logos/tractianShortLogo.png";
import {
  Box,
  Divider,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

const PROJECT_URL = "http://localhost:3000/";

export const SideMenu: React.FC = () => {
  const { push, pathname } = useRouter();
  const { t } = useTranslation("common");
  const [account, _] = useRecoilState(accountState);
  const isMobile = useBreakpointValue({ base: true, md: false, lg: false });

  const handleLanguageChange = (language: "pt-BR" | "en-US") => {
    const isValid = typeof window !== "undefined";

    if (isValid) {
      window.location.replace(`${PROJECT_URL}${language}${pathname}`);
    }
  };

  const SIDE_MENU_ITEMS = [
    {
      icon: Grid,
      path: "/dashboard",
      name: t("dashboard"),
    },
    {
      icon: User,
      path: "/users",
      name: t("users"),
    },
    {
      icon: Home,
      path: "/units",
      name: t("units"),
    },
  ];

  return (
    <>
      <VStack
        bg="#FFF"
        h={"100%"}
        borderRadius={20}
        p={{ base: 2, md: 5, lg: 5 }}
        justifyContent={"space-between"}
        boxShadow={"0px 0px 10px rgba(0,0,0,.08)"}
        w={{ base: "20%", md: "auto", lg: "auto" }}
      >
        <VStack pt={1} px={5} w="270px" height={"100%"} borderRadius={10}>
          {isMobile ? (
            <Image
              alt="Tractian logo"
              src={tractianShortLogo.src}
              style={{ width: "50px", marginBottom: "10px" }}
            />
          ) : (
            <Image
              alt="Tractian logo"
              src={tractionLogo.src}
              style={{ width: "120px", marginBottom: "10px" }}
            />
          )}
          <Image
            alt=""
            borderRadius="full"
            border="2px solid #FFF"
            boxSize={{ base: "50px", md: "100px", lg: "100px" }}
            src="https://xsgames.co/randomusers/avatar.php?g=female"
          />
          <Text color={"#242424"} fontWeight={"semibold"}>
            {isMobile ? account?.name.split(" ")[0] : account?.name}
          </Text>
          <VStack w={"100%"} pt={10}>
            {SIDE_MENU_ITEMS.map((item) => {
              const isCurrentScreen = pathname.includes(item.path);
              return (
                <HStack
                  p={5}
                  borderRadius={10}
                  cursor={"pointer"}
                  justifyContent={"flex-start"}
                  onClick={() => push(item.path)}
                  w={{ base: "auto", md: "100%", lg: "100%" }}
                  sx={{
                    bg: isCurrentScreen ? "rgb(22, 119, 255)" : "transparent",
                    ":hover": {
                      bg: "rgba(22, 119, 255, .15)",
                    },
                  }}
                >
                  <Box
                    as={item.icon}
                    color={isCurrentScreen ? "#FFF" : "#242424"}
                  />
                  <Text
                    hidden={isMobile}
                    fontWeight={"semibold"}
                    color={isCurrentScreen ? "#FFF" : "#242424"}
                  >
                    {item.name}
                  </Text>
                </HStack>
              );
            })}
          </VStack>
        </VStack>
        <Stack
          opacity={0.5}
          color="#242424"
          gap={{ base: 1, md: 3, lg: 3 }}
          direction={{ base: "column", md: "row", lg: "row" }}
        >
          <Text
            cursor={"pointer"}
            onClick={() => handleLanguageChange("en-US")}
          >
            En-US
          </Text>
          <Divider opacity={0.15} borderRadius={10} orientation="vertical" />
          <Text
            cursor={"pointer"}
            onClick={() => handleLanguageChange("pt-BR")}
          >
            Pt-BR
          </Text>
        </Stack>
      </VStack>
    </>
  );
};
