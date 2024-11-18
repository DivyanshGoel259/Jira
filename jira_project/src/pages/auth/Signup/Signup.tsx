import { useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { signup } from "./api"
import { globalState } from "../../../store/state"
import { useNavigate } from "react-router-dom"
import useReducerPlus from "../../../hooks/useReducerPlus"
import { GoogleIcon } from "../../../assets/Icons"
import toast from "react-hot-toast"


export const Signup = () => {
    const navigate = useNavigate()
    const { set, user } = globalState()
    const [state, update] = useReducerPlus({
        isLoading: false,
        error: "",
        email: "",
        password: "",
        image_url: "",
        name: ""
    })
    useEffect(() => {
        if (user) {
            navigate("/onboarding")
        }
    })

    const handleClick = async () => {
        update({
            isLoading: true
        })
        const [data, err] = await signup({ name: state.name, email: state.email, password: state.password, image_url: state.image_url })
        if (err) {
            update({
                error: err.message,
                isLoading: false
            })
            toast.error(err.message)
            return
        }
        update({
            isLoading: false
        })
        set({
            user: data
        })


    }



    return <div className="flex justify-center flex-col pt-10">
        <div className="flex justify-center">
            <div className="bg-[#101825] p-6 rounded-[10px]">
                <div>
                    <Heading title="Zcrum" />
                    <SubHeading title="Enter your details below to create an account" />
                </div>
                <div className="mt-6">
                    
                    <div className="flex justify-center mt-3">
                        <Button variant={"default"} className="">Continue with <GoogleIcon/></Button>
                    </div>
                    <div className="flex justify-center mt-3">
                        or
                    </div>
                    <div className="mt-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input onChange={(e) => {
                            update({
                                name: e.target.value
                            })
                        }} className="mt-1" type="text" id="name" placeholder="Enter your full name" />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="email">Email</Label>
                        <Input onChange={(e) => {
                            update({
                                email: e.target.value
                            })
                        }} className="mt-1" type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="Password">Password</Label>
                        <Input onChange={(e) => {
                            update({
                                password: e.target.value
                            })
                        }} className="mt-1" type="password" id="Password" placeholder="Enter your password" />
                    </div>
                    <div className="underline font-semibold mt-3 text-sm flex justify-end">
                        Forget your password?
                    </div>
                    <div onClick={()=>{
                        navigate("/sign-in")
                    }} className="cursor-pointer underline font-semibold mt-3 text-sm flex justify-start">
                        Already have an Account? Signin
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button onClick={handleClick} className="w-full ">{state.isLoading ? <div role="status">
                            <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div> : "Login"}</Button>
                    </div>
                    <div>
                    </div>
                </div>

            </div>


        </div>
    </div>
}