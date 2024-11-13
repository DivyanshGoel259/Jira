import { UserType } from "../types";
import createNewStore from "../zustand";

interface userStateType {
  user:UserType|null
}

const initialState:userStateType = {
  user:null,
}
export const userState = createNewStore(initialState,{
  name:"global",
  devTools:true,
  persist:true
})