import { PropsWithChildren, useEffect, useState } from "react";
import { SideMenu } from "../SideMenu";
import { HStack, Select, Stack } from "@chakra-ui/react";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [company, setCompany] = useState<any>();

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/tractian/fake-api/companies")
      .then((res) => res.json())
      .then((res) => {
        const companiesOptions: any = [];

        res.map((item: any) =>
          companiesOptions.push({
            value: item.id,
            name: item.name,
          })
        );

        setCompany(companiesOptions);
      });
  }, []);

  return (
    <Stack
      p={10}
      height={"100vh"}
      overflow={"hidden"}
      bg="rgba(255, 255, 255, 0.87)"
    >
      <HStack
        p={10}
        pt={"100px"}
        bg="#242424"
        height={"100%"}
        borderRadius={20}
        position={"relative"}
        alignItems={"flex-start"}
        boxShadow={"0px 0px 10px rgba(0,0,0,.5)"}
      >
        <SideMenu />
        <Stack height={"100%"} overflowY={"scroll"}>
          {children}
        </Stack>
        <Stack
          top={10}
          right={10}
          position={"absolute"}
          alignItems={"flex-end"}
        >
          <Select
            w={"250px"}
            color="#FFF"
            border={"1px solid rgba(255,255,255,.1)"}
          >
            {company?.map((item: any) => (
              <option value={item.value}>{item.name}</option>
            ))}
          </Select>
        </Stack>
      </HStack>
    </Stack>
  );
};
