import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useTranslation } from "next-i18next";
import { accountState } from "~/atoms/account";
import { Grid, User, Home, Moon, Sun } from "react-feather";
import tractionLogo from "~/assets/logos/tractianLogo.png";
import tractianShortLogo from "~/assets/logos/tractianShortLogo.png";
import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  Switch,
  Text,
  VStack,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const PROJECT_URL = "https://tractian-test-ten.vercel.app/";

export const SideMenu: React.FC = () => {
  const { push, pathname } = useRouter();
  const { t } = useTranslation("common");
  const { toggleColorMode } = useColorMode();
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

  const color = useColorModeValue("#242424", "#FFF");
  const bg = useColorModeValue("#FFF", "rgb(24, 26, 27)");

  return (
    <>
      <VStack
        bg={bg}
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
          <Text color={color} fontWeight={"semibold"}>
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
                    color={isCurrentScreen ? "#FFF" : color}
                  />
                  <Text
                    hidden={isMobile}
                    fontWeight={"semibold"}
                    color={isCurrentScreen ? "#FFF" : color}
                  >
                    {item.name}
                  </Text>
                </HStack>
              );
            })}
          </VStack>
        </VStack>

        <Stack
          pb={2}
          opacity={0.5}
          color={color}
          alignItems={"flex-end"}
          gap={{ base: 1, md: 3, lg: 3 }}
          direction={{ base: "column", md: "row", lg: "row" }}
        >
          <Stack direction={{ base: "column", md: "row", lg: "row" }}>
            {!isMobile && <Icon color="black" as={Moon} boxSize={6} mr={2} />}
            {isMobile && <Text fontSize={"xs"}>Dark/light</Text>}
            <Switch
              size="lg"
              orientation={"vertical"}
              onChange={() => toggleColorMode()}
            />
            {!isMobile && <Icon as={Sun} color="orange" boxSize={6} ml={2} />}
          </Stack>
          <Stack direction={{ base: "column", md: "row", lg: "row" }}>
            <Text
              cursor={"pointer"}
              onClick={() => handleLanguageChange("en-US")}
            >
              En-US
            </Text>
            <Divider opacity={0.5} borderRadius={10} orientation="vertical" />
            <Text
              cursor={"pointer"}
              onClick={() => handleLanguageChange("pt-BR")}
            >
              Pt-BR
            </Text>
          </Stack>
        </Stack>
      </VStack>
    </>
  );
};
