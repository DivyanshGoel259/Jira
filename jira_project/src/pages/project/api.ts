import { post } from "../../lib/network"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const createNewProject = async (project:any)=>{
    try{
        const token =localStorage.getItem("token")
        const data = await post(`${BACKEND_URL}/api/v1/project`,project,{headers:{"Authorization":token!}})
        return [data,null] as [any,null]
    }catch(err:any){
        return [null,err] as [null,Error]
    }
}