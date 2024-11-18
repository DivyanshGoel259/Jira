import { post } from "../../../lib/network";
import { SignInInputType, UserType } from "../../../types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const signIn = async (userInfo:SignInInputType)=>{
    try{
        const response = await post(`${BACKEND_URL}/api/v1/user/signin`,userInfo)
        localStorage.setItem("token",`Bearer ${response.token}`)               
        const data = response.user
        return [data,null] as [UserType,null]
    } catch (err:any){
        return [null,err] as [null,Error]
    }
}