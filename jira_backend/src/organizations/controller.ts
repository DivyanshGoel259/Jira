
import { Request,Response } from "express"
import * as service from "./service"
export const createOrganization = async (req:Request,res:Response)=>{
    try {
        const userId = (req as any).userId                
        const data = await service.createOrganization({...req.body,userId})
        return res.json({data})
    } catch(err:any){
        const errorMessage = err.message || "Error Creating Organization"
        return res.json({error:{message:errorMessage}})
    }
}

export const getOrganization = async (req:Request,res:Response)=>{
    try {
        const userId = (req as any).userId  
        const orgId = req.params.orgId           
        const data = await service.getOrganization({orgId,userId})
        return res.json({data})
    } catch(err:any){
        const errorMessage = err.message || "Error getting Organization"
        return res.json({error:{message:errorMessage}})
    }
}

export const getAllOrganizationForUser = async (req:Request,res:Response)=>{
    try {
        const userId = (req as any).userId         
        const data = await service.getAllOrganizationForUser(userId)
        return res.json({data})
    } catch(err:any){
        const errorMessage = err.message || "Error getting Organizations"
        return res.json({error:{message:errorMessage}})
    }
}
