import db from "../libs/utils"
import { Roles } from "../types"

export const createProject = async (payload:any)=>{
    try {     
        if(payload.role!=Roles.ADMIN){
            throw new Error("UnAuthorized")
        }
        const newProject = await db.oneOrNone(`INSERT INTO project(name,key,description,organization_id) VALUES($(name),$(key),$(description),$(orgId))`,payload)
        return newProject
    }catch(err:any){
        throw err        
    }
}

export const getAllProjects = async (orgId:string)=>{
    try{
        const projects = await db.manyOrNone(`SELECT * FROM project WHERE organization_id = $(orgId)`,{orgId})
        return projects
    }catch(err:any){
        throw err
    }
}