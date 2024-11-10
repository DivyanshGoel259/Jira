import { useAuth } from "@clerk/clerk-react"
import { ReactElement } from "react"
import { useNavigate } from "react-router-dom"

export const RequireAuth = ({children}:{children:ReactElement})=>{
    const {isSignedIn} = useAuth()
    const navigate = useNavigate()
    if(!isSignedIn){
        navigate("/sign-in")
    }
    return children
}