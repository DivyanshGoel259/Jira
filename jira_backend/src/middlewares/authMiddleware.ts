import { Request,Response,NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { JWT_SECRET } from "../libs/env"
export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    try{
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            throw new Error("unAuthorized")
        }
        const token = authHeader.split(" ")[1]  

        const decoded:any = verify(token,JWT_SECRET!)
        if(!decoded){
            throw new Error("unAuthorized")
        }
        (req as any).userId = decoded.id
        next()
    }catch(err:any){
        res.status(403).json({error:{message:err.message}})
    }
}