import { UserType } from "../types";
import createNewStore from "../zustand";

interface userStateType {
  userData:UserType|null
}

const initialState:userStateType = {
  userData:null
}
export const userState = createNewStore(initialState,{
  name:"global",
  devTools:true
})