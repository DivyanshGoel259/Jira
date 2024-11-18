import { post } from "../../../lib/network";
import { UserType } from "../../../types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const signup = async (userInfo: UserType) => {
  try {
    const response = await post(`${BACKEND_URL}/api/v1/user/signup`, userInfo);
    localStorage.setItem("token", `Bearer ${response.token}`);
    const data = response.user;
    return [data, null] as [UserType, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};
