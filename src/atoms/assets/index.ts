import { atom } from "recoil";
import { IAsset } from "~/types/api";

export const assetsState = atom<IAsset[] | null>({
  key: "assets",
  default: null,
});
