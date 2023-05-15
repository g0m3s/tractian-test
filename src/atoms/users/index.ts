import { atom } from "recoil";
import { IUser } from "~/types/api";

export const usersState = atom<IUser[] | null>({
  key: "users",
  default: null,
});
