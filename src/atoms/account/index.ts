import { atom } from "recoil";
import { IAccount } from "~/types/api";

export const accountState = atom<IAccount | null>({
  key: "account",
  default: null,
});
