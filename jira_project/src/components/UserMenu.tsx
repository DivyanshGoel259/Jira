
import { ChartIcon } from "../assets/Icons"
import { userState } from "../store/state"
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar"

export const UserMenu = () => {
    const {user} = userState()
    return <div className="flex justify-center flex-col">
        <Avatar>
        <AvatarImage src={user?.image_url} />
        <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
    </div>
}