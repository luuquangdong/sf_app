import { selector } from "recoil";
import { tournamentState } from "../atoms/tournamentState";

export const charCountState = selector({
  key: "charCountState", // unique ID (with respect to other atoms/selectors)
  get: (params) => {
    console.log(params);
    const { get } = params;
    const text = get(tournamentState);

    return text.id;
  },
});
