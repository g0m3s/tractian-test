import { atom } from "recoil";
import { IWorkOrder } from "~/types/api";

export const workOrdersState = atom<IWorkOrder[] | null>({
  key: "workOrders",
  default: null,
});
