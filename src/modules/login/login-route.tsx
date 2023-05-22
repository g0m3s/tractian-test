import {
  Button,
  Image,
  Input,
  Link,
  Text,
  VStack,
  InputGroup,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { AppLayout } from "~/components";
import { IAccount } from "~/types/api";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { accountState } from "~/atoms/account";
import tractionLogo from "~/assets/logos/tractianLogo.png";

export const LoginRoute: NextPage = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const { t } = useTranslation(["modules/users", "common"]);
  const [account, setAccountInfos] = useRecoilState(accountState);
  const [availableUsers, setAvailableUsers] = useState<IAccount[]>([]);

  useEffect(() => {
    const localUser = localStorage.getItem("t_user");
    if (localUser) {
      setAccountInfos(JSON.parse(localUser) as IAccount);
      return
    }
    fetch("https://my-json-server.typicode.com/tractian/fake-api/users")
      .then((res) => res.json())
      .then((res: IAccount[]) => {
        setAvailableUsers(res);
      });
  }, []);

  const onSubmit = () => {
    const selectedAccount = availableUsers.find((user) => user.email === email);
    if (!!selectedAccount) {
      setAccountInfos(selectedAccount);
      localStorage.setItem("t_user", JSON.stringify(selectedAccount));
      push("/dashboard");
      return;
    }
    setEmailError(t("email_not_found") as string);
  };

  if (account !== null) {
    push("/dashboard");
  }

  return (
    <AppLayout isLogin>
      <VStack justifyContent={"center"} flex={1} w={"100%"}>
        <Image mb={10} w={"150px"} alt="Tractian logo" src={tractionLogo.src} />

        <VStack gap={5} borderRadius={10} p={10} bg="#FFF">
          <Text color='#000' fontWeight={"semibold"}>
            Enter one of the emails provided by{" "}
            <Link
              target="_blank"
              href="https://my-json-server.typicode.com/tractian/fake-api/users"
            >
              fake-api
            </Link>
          </Text>
          <InputGroup orientation="vertical">
            <VStack alignItems={"flex-end"} w="100%">
              <Input
                type="email"
                borderRadius={10}
                isInvalid={!!emailError}
                placeholder="testerOne@tractian.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Text textAlign={"end"} hidden={!emailError} color="red">
                {emailError}
              </Text>
            </VStack>
          </InputGroup>
          <Button onClick={onSubmit} color="#FFF" bg="#1677ff" width={"100%"}>
            {t("login")}
          </Button>
        </VStack>
      </VStack>
    </AppLayout>
  );
};
