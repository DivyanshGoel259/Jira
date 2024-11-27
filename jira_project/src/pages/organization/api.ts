import { del, get } from "../../lib/network";
// import { organization } from "../../store/state"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// export const getOrganization = async (id:string)=>{
//     try{
//         const token = localStorage.getItem("token")
//         if(!token){throw new Error("Token not Found")}
//         const data = await get(`${BACKEND_URL}/api/v1/organizations/${id}`,{headers:{"Authorization":token}})
//         return [data,null] as [organization,null]
//     }catch(err:any){
//         return [null,err] as [null,Error]
//     }
// }

export const getProjects = async (orgId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not Found");
    }
    const data = await get(`${BACKEND_URL}/api/v1/project/bulk/${orgId}`, {
      headers: { Authorization: token },
    });
    return [data, null] as [any, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not Found");
    }
    const data = await del(`${BACKEND_URL}/api/v1/project/${projectId}`, {
      headers: { Authorization: token },
    });
    return [data, null] as [any, null];
  } catch (err: any) {
    return [null, err] as [null, Error];
  }
};
