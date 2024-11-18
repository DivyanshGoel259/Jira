import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { UserMenu } from "./UserMenu";
import { globalState } from "../store/state";
import { CreateProjectModal } from "./createProjectModal";
import toast from "react-hot-toast"
import logo from '../assets/logo2.png'
export const Header = () => {
  const navigate = useNavigate();
  const { user, organization } = globalState();
  const handleSigninClick = () => {
    navigate("/sign-in");
  };
  const handleClick = () => {
    if(!user){
      toast.error("Please Login")
      navigate("/sign-in")
      return
    }
    if (!organization?.selected) {
      toast.error("No Organization selected")
      return
    }
  };
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="font-bold flex justify-center flex-col ">
          <img src={logo} alt="zcrum" className="h-6 w-24" />
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex justify-center flex-col">
            {user &&
            organization?.selected &&
            organization?.selected.role == "admin" ?
              <CreateProjectModal /> : (
              <Button onClick={handleClick} variant="destructive">
                Create Project
              </Button>
            )}
          </div>
          <div className="flex justify-center flex-col">
            {user ? (
              <UserMenu />
            ) : (
              <Button variant={"outline"} onClick={handleSigninClick}>
                Signin
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
