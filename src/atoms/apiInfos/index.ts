import { atom } from "recoil";

export const apiInfosState = atom<any[]>({
  key: "apiInfos",
  default: [],
});
