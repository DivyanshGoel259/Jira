import { UserType } from "../types";
import createNewStore from "../zustand";

export interface organization {
  id?: string;
  name: string;
  slug?: string;
  logo_url: URL;
  role?: string;
}

interface GlobalStateType {
  user: UserType | null;
  organization: {
    all: organization[];
    selected: organization;
  } | null;
}

const initialState: GlobalStateType = {
  user: null,
  organization: null,
};
export const globalState = createNewStore(initialState, {
  name: "global",
  devTools: true,
  persist: true,
});
