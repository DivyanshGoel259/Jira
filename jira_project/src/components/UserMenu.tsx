import { useNavigate } from "react-router-dom";
import { globalState } from "../store/state";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const UserMenu = () => {
  const navigate = useNavigate()
  const {reset, user } = globalState();
  return (
    <div className="flex justify-center flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image_url} />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>{
            reset()
            localStorage.removeItem("token")
          }}>Logout</DropdownMenuItem>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          <DropdownMenuItem onClick={()=>{
            navigate("/onboarding")
          }}>My Organizations</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
