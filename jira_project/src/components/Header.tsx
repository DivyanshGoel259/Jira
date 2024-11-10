import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { UserMenu } from "./UserMenu"
import { checkUser } from "../pages/auth/CheckUser"
export const Header =() => {
    const navigate = useNavigate()
    const handleClick = () => { navigate("/sign-in") }
    return <div className="p-4">
        <div className="flex justify-between">
            <div className="font-bold flex justify-center flex-col ">
                <img src="src/assets/logo2.png" alt="zcrum" className="h-6 w-24"/>
            </div>
            <div className="flex justify-between items-center gap-4">
                <div className="flex justify-center flex-col">
                    <Button variant={"destructive"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        Create Project

                    </Button>
                </div>
                <div className="flex justify-center flex-col">


                    <SignedOut >
                        <Button  variant={"outline"} onClick={handleClick}>Signin</Button>
                    </SignedOut>
                    <SignedIn>
                        <UserMenu />
                    </SignedIn>
                </div>
            </div>
        </div>
    </div>
}