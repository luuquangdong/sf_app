import { atom } from "recoil";

export const currentPostState = atom({
  key: "post",
  default: null,
});
