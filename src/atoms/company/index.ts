import { atom } from "recoil";
import { ICompany } from "~/types/api";

export const companyState = atom<ICompany | null>({
  key: "company",
  default: null,
});
