import { useUser } from "@clerk/clerk-react"
import { userState } from "../../store/state"
import { getUser } from "./api"
import { useEffect } from "react"

export const checkUser = async ()=>{
    const {set,userData:userS} = userState()
    const {isSignedIn,user} = useUser()
    useEffect(()=>{
        async function insertUser(){
            if(isSignedIn && user && !userS){
                const userData = {
                    clerk_user_id: user.id,
                    email: user.emailAddresses[0].emailAddress,
                    image_url: user.imageUrl,
                    name: user.fullName!
                }
                
                const [_,err] = await getUser(userData!)
                if(err){
                    return 
                }                      
                set({userData:userData})
            }
        }
        insertUser()
        
        
    },[user,isSignedIn])

    return 
}