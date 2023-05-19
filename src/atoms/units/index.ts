import { atom } from "recoil";
import { IUnit } from "~/types/api";

export const unitsState = atom<IUnit[] | null>({
  key: "units",
  default: null,
});
