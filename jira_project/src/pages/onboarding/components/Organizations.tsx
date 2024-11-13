import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import useReducerPlus from "../../../hooks/useReducerPlus"

export const Organizations = () => {
    const [state, update] = useReducerPlus({ iscreating: false, orgName: "", orgSlug: "", logo: "" })
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) {
                alert("No file selected");
                return;
            }
            const file = e.target.files[0]
            const formData = new FormData()
            formData.append("file", file)
            formData.append("upload_preset", "o2zq04ft")
            const response = await fetch("https://api.cloudinary.com/v1_1/dpam4vkbx/image/upload",{
                method:"POST",
                body:formData
            })
            const data = await response.json()
            update({logo:data.secure_url})
            console.log(state.logo);
            alert("Uploaded SuccesFully")
        } catch(err){
            console.log(err)
            alert("Error uploading picture , Try Again ")
        }
    }

    

    return <div className="w-[20rem] overflow-hidden border border-gray-800 bg-[#101825] rounded-[18px] ">
            <div className="py-8">
                <div className="text-xl font-bold text-center">
                    {state.iscreating ? "Create Organization" : "Choose an Organization"}
                </div>
                {state.iscreating ? <div></div> : <div className="text-center text-md text-gray-400">
                    to continue to zcrum
                </div>}
            </div>

            <div>
                {state.iscreating ? <div>
                    <div className="p-4">
                        <div className="ml-1">
                            Logo
                        </div>
                        <div className=" mt-2 gap-4">
                            <div>
                                <Input onChange={handleImageUpload} className="border border-gray-800" type="file" />
                            </div>
                            <div className="flex gap-2 mt-2">
                                <div className="text-xs mt-2">
                                    Recommended size upto 10mb
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="orgName">Name</Label>
                            <Input onChange={(e) => {
                                update({ orgName: e.target.value })
                            }} type="text" className="mt-1" id="orgName" placeholder="Enter your organization name" />
                        </div>
                        <div className="mt-2">
                            <Label htmlFor="orgSlug">Slug</Label>
                            <Input onChange={(e) => {
                                update({ orgSlug: e.target.value })
                            }} type="text" className="mt-1" id="orgSlug" placeholder="Enter your organization slug" />
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button className="bg-blue-500  text-white hover:bg-blue-700">Create Organization</Button>
                        </div>
                    </div>
                </div> : <div className="cursor-pointer hover:bg-gray-800 px-6 border-t border-t-gray-800 py-5 w-full  flex gap-6 mt-8">
                    <div className=" rounded-full w-8 h-8 border items-center border-gray-600 bg-gray-800 py-2 px-2 flex justify-center flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                    </div>
                    <div onClick={() => {
                        update({ iscreating: true })
                    }} className="flex justify-center flex-col">
                        Create Organization
                    </div>
                </div>}
            </div>
        </div>
    }