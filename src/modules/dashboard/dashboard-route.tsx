import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { AppLayout } from "~/components";
import { unitsState } from "~/atoms/units";
import { usersState } from "~/atoms/users";
import { assetsState } from "~/atoms/assets";
import { useTranslation } from "next-i18next";
import { companyState } from "~/atoms/company";
import { accountState } from "~/atoms/account";
import { useEffect, useMemo, useState } from "react";
import { workOrdersState } from "~/atoms/workOrders";
import { FullReturn, IAccount, IAsset, IWorkOrder } from "~/types/api";
import { AssetDetailModal, WorkOrders, AssetsList } from "./components";
import { Text, HStack, VStack, Divider, useDisclosure, useColorModeValue } from "@chakra-ui/react";

type WorkOrdersByStatusProps = {
  toDo: IWorkOrder[];
  completed: IWorkOrder[];
  inProgress: IWorkOrder[];
};

export const DashboardRoute: NextPage = () => {
  const { push } = useRouter();
  const color = useColorModeValue("#242424", "#FFF");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const bg = useColorModeValue("#FFF", "rgb(24, 26, 27)");
  const [selectedAsset, setSelectedAsset] = useState<IAsset>();
  const { t } = useTranslation(["modules/dashboard", "common"]);

  const [assets] = useRecoilState(assetsState);
  const [, setUnits] = useRecoilState(unitsState);
  const [, setUsers] = useRecoilState(usersState);
  const [, setAssets] = useRecoilState(assetsState);
  const [, setCompany] = useRecoilState(companyState);
  const [workOrders] = useRecoilState(workOrdersState);
  const [, setWorkOrders] = useRecoilState(workOrdersState);
  const [account, setAccountInfos] = useRecoilState(accountState);

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

  const todoWorkOrders = useMemo(() => {
    return <WorkOrders items={workOrdersByStatus.toDo} tasksStatus="toDo" />;
  }, [workOrders]);

  const inProgressWorkOrders = useMemo(() => {
    return (
      <WorkOrders
        items={workOrdersByStatus.inProgress}
        tasksStatus="inProgress"
      />
    );
  }, [workOrders]);

  const completedWorkOrders = useMemo(() => {
    return (
      <WorkOrders
        items={workOrdersByStatus.completed}
        tasksStatus="completed"
      />
    );
  }, [workOrders]);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/tractian/fake-api/db")
      .then((res) => res.json())
      .then((res: FullReturn) => {
        setUsers(res.users);
        setUnits(res.units);
        setAssets(res.assets);
        setCompany(res.companies[0]);
        setWorkOrders(res.workorders);
      });
  }, [account]);

  useEffect(() => {
    const localUser = localStorage.getItem("t_user");
    if (localUser) {
      setAccountInfos(JSON.parse(localUser) as IAccount);
      return;
    }
    push("/login");
  }, []);

  return (
    <AppLayout>
      <VStack
        bg={bg}
        borderRadius={20}
        p={{ base: 4, md: 8, lg: 8 }}
        boxShadow={"0px 0px 10px rgba(0,0,0,.1)"}
      >
        <AssetsList handleSelectedAsset={handleSelectedAsset} assets={assets} />

        <VStack w="100%" h="100%" alignItems={"flex-start"}>
          <Text py={10} fontWeight={"bold"} fontSize={"2xl"} color={color}>
            {t("workorders")}
          </Text>
          <HStack
            w="100%"
            h="100%"
            overflowX={"scroll"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
          >
            {todoWorkOrders}
            <Divider opacity={0.05} orientation="vertical" />
            {inProgressWorkOrders}
            <Divider opacity={0.05} orientation="vertical" />
            {completedWorkOrders}
          </HStack>
        </VStack>
      </VStack>
      <AssetDetailModal
        isOpen={isOpen}
        onClose={onClose}
        asset={selectedAsset}
      />
    </AppLayout>
  );
};
