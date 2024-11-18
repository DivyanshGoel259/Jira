import { post, get } from "../../lib/network";
import { CreateOrganizationType, createOrganizationType } from "../../types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const createOrganizationAPI = async (
  orgInfo: createOrganizationType
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const data = await post(`${BACKEND_URL}/api/v1/organizations`, orgInfo, {
      headers: { Authorization: token },
    });

    return [data, null] as [CreateOrganizationType, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const getAllOrganizationForUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const data = await get(`${BACKEND_URL}/api/v1/organizations/user/all`, {
      headers: { Authorization: token },
    });

    return [data, null] as [any, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};
