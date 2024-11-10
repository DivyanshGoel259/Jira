import { Request , Response } from "express"
import * as service from './service'

export const getUser = async(req:Request,res:Response)=>{
    try{
        const data = await service.getUser(req.body)
        return res.json({data})
    } catch (err:any){
        const errorMessage = err.message || "Error Getting User"
        return res.json({error:{message:errorMessage}})
    }
}