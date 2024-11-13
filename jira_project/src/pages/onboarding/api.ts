import { post } from "../../lib/network";
import { createOrganizationType,  UserType } from "../../types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const signIn = async (orgInfo:createOrganizationType)=>{
    try{
        const response = await post(`${BACKEND_URL}/api/v1/organizations`,orgInfo)       
        const data = response.user
        return [data,null] as [UserType,null]
    } catch (err:any){
        return [null,err] as [null,Error]
    }
}