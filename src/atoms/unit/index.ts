import { atom } from "recoil";
import { IUnit } from "~/types/api";

export const unitState = atom<IUnit | null>({
  key: "unit",
  default: null,
});
