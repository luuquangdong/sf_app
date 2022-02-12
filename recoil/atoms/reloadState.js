import { atom } from "recoil";

export const reloadState = atom({
  key: "reload",
  default: false,
});
