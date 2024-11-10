import { SignIn} from "@clerk/clerk-react"

export const Signin = ()=>{
    
    return <div className="flex justify-center flex-col pt-16">
    <div className="flex justify-center">
    <SignIn/> 
    </div>    
</div>
}