import { NextPage } from "next";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Grid,
  Text,
  Image,
  HStack,
  VStack,
  Divider,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { AppLayout } from "~/components";
import * as Highcharts from "highcharts";
import { unitState } from "~/atoms/unit";
import { Maximize2 } from "react-feather";
import { usersState } from "~/atoms/users";
import { assetsState } from "~/atoms/assets";
import { useTranslation } from "next-i18next";
import { accountState } from "~/atoms/account";
import { generateOptions } from "~/utils/utils";
import { workOrdersState } from "~/atoms/workOrders";
import HighchartsReact from "highcharts-react-official";
import { FullReturn, IAccount, IAsset, IWorkOrder } from "~/types/api";
import { AssetStatusBadge, AssetDetailModal, WorkOrders } from "./components";

type WorkOrdersByStatusProps = {
  toDo: IWorkOrder[];
  completed: IWorkOrder[];
  inProgress: IWorkOrder[];
};

export const DashboardRoute: NextPage = () => {
  const { push } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedAsset, setSelectedAsset] = useState<IAsset>();
  const { t } = useTranslation(["modules/dashboard", "common"]);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [unit] = useRecoilState(unitState);
  const [, setUsers] = useRecoilState(usersState);
  const [assets, setAssets] = useRecoilState(assetsState);
  const [account, setAccountInfos] = useRecoilState(accountState);
  const [workOrders, setWorkOrders] = useRecoilState(workOrdersState);

  useEffect(() => {
    const localUser = localStorage.getItem("t_user");
    if (localUser) {
      setAccountInfos(JSON.parse(localUser) as IAccount);
      return;
    }
    push("/login");
  }, []);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/tractian/fake-api/db")
      .then((res) => res.json())
      .then((res: FullReturn) => {
        setWorkOrders(res.workorders);
        setUsers(res.users.filter((user) => user.unitId === unit?.id));
        setAssets(res.assets.filter((asset) => asset.unitId === unit?.id));
      });
  }, [account]);

  const handleSelectedAsset = (assetId: number) => {
    setSelectedAsset(assets?.find((asset) => asset.id === assetId));
    onOpen();
  };

  const workOrdersByStatus = useMemo((): WorkOrdersByStatusProps => {
    const tasks: WorkOrdersByStatusProps = {
      toDo: [],
      completed: [],
      inProgress: [],
    };

    workOrders?.forEach((item) => {
      switch (item.status) {
        case "todo":
          return tasks.completed.push(item);
        case "completed":
          return tasks.completed.push(item);
        case "in progress":
          return tasks.inProgress.push(item);
        default:
          return;
      }
    });

    return tasks;
  }, [workOrders]);

  return (
    <AppLayout>
      <Text pb={10} pl={5} fontWeight={"bold"} fontSize={"2xl"} color="#FFF">
        {t("unit_assets")}
      </Text>
      <HStack px={5} alignItems={"flex-start"} flexWrap={"wrap"} w={"100%"}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {assets?.map((item) => (
            <GridItem
              w="100%"
              cursor={"pointer"}
              onClick={() => handleSelectedAsset(item.id)}
            >
              <VStack
                p={5}
                w={"350px"}
                bg={"#FFF"}
                borderRadius={30}
                boxShadow={"0px 0px 10px rgba(0,0,0,.3)"}
              >
                <Text
                  color="#242424"
                  fontSize={"2xl"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  whiteSpace={"nowrap"}
                >
                  {item.name}
                </Text>
                <HStack pt={2} w={"100%"}>
                  <Image
                    alt=""
                    boxSize="120px"
                    src={item.image}
                    borderRadius={10}
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                  <HighchartsReact
                    options={generateOptions(
                      item.healthscore,
                      t("health_score"),
                      item.status
                    )}
                    highcharts={Highcharts}
                    ref={chartComponentRef}
                  />
                </HStack>

                <HStack pt={5} justifyContent={"space-between"} w="100%">
                  <HStack opacity={0.5}>
                    <Text fontSize={"sm"}>{t("common:show_more")}</Text>
                    <Maximize2 opacity={0.5} size={12} />
                  </HStack>
                  <AssetStatusBadge status={item.status}>
                    <Text color="#FFF">{item.status}</Text>
                  </AssetStatusBadge>
                </HStack>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </HStack>
      <VStack p={5} h="100%" alignItems={"flex-start"}>
        <Text py={10} fontWeight={"bold"} fontSize={"2xl"} color="#FFF">
          {t("workorders")}
        </Text>
        <HStack
          w="100%"
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <WorkOrders items={workOrdersByStatus.toDo} tasksStatus="toDo" />
          <Divider opacity={0.05} orientation="vertical" />
          <WorkOrders
            items={workOrdersByStatus.inProgress}
            tasksStatus="inProgress"
          />
          <Divider opacity={0.05} orientation="vertical" />
          <WorkOrders
            items={workOrdersByStatus.completed}
            tasksStatus="completed"
          />
        </HStack>
      </VStack>
      <AssetDetailModal
        isOpen={isOpen}
        onClose={onClose}
        asset={selectedAsset}
      />
    </AppLayout>
  );
};
