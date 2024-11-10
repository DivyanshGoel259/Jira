import { post } from "../../lib/network";
import { UserType } from "../../types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const getUser = async (userInfo:UserType)=>{
    try{
        const data = await post(`${BACKEND_URL}/api/v1/user/auth`,userInfo)
        return [data,null] as [UserType,null]
    } catch (err:any){
        return [null,err] as [null,Error]
    }
}