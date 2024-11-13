
import { Request,Response } from "express"
import * as service from "./service"
export const createOrganization = async (req:Request,res:Response)=>{
    try {
        const userId = "vshbjbvhhvjbbhvbjn"
        const {orgName,orgSlug,logo} = req.body
        if(!userId){
            throw new Error("unAuthorized")
        }
        const data = await service.createOrganization({userId,orgSlug,logo,orgName})
        return res.json({data})
    } catch(err:any){
        const errorMessage = err.message || "Error Creating Organization"
        return res.json({error:{message:errorMessage}})
    }
}