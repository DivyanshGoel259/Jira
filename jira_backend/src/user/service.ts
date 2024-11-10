import { UserType } from "../types";
import db from "../libs/utils";

type User = Pick<UserType,"clerk_user_id"|"email"|"image_url"|"name">

export const getUser = async (payload:User)=>{   
     
    try{
        const {clerk_user_id,email,name,image_url}= payload
        const checkUser = await db.oneOrNone(`
            SELECT * FROM users WHERE clerk_user_id = $(clerk_user_id)`,{clerk_user_id})
        if(!checkUser?.id){
            const createdUser = await db.one<UserType>(`
                INSERT INTO users(clerk_user_id,email,name,image_url) VALUES($(clerk_user_id),$(email),$(name),$(image_url)) RETURNING *`,{clerk_user_id,email,name,image_url})
            return createdUser
        } else {
            return checkUser
        }

    } catch(err:any){
        console.log(err);
        throw err
        
    }
}