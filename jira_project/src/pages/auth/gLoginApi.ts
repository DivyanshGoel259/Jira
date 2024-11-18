import { post } from "../../lib/network";
import { UserType } from "../../types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const gLoginReq = async (accessToken: string) => {
  try {
    const response = await post(`${BACKEND_URL}/api/v1/user/glogin`, {
      accessToken,
    });
    localStorage.setItem("token", `Bearer ${response.token}`);
    const data = response.user;
    return [data, null] as [UserType, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};
