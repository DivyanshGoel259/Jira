import { Request , Response } from "express"
import * as service from './service'

export const signup = async(req:Request,res:Response)=>{
    try{
        const data = await service.signup(req.body)
        return res.json({data})
    } catch (err:any){
        const errorMessage = err.message || "Signup Failed"
        return res.status(400).json({error:{message:errorMessage}})
    }
}

export const gLogin = async(req:Request,res:Response)=>{
    try{
        const data = await service.gLogin(req.body)
        return res.json({data})
    } catch (err:any){
        const errorMessage = err.message || "Google Sigin Failed"
        return res.status(400).json({error:{message:errorMessage}})
    }
}

export const signin = async(req:Request,res:Response)=>{
    try{
        const data = await service.signin(req.body)
        return res.json({data})
    } catch (err:any){
        const errorMessage = err.message || "Signin Failed"
        return res.status(400).json({error:{message:errorMessage}})
    }
}