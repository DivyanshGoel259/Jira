import { ReactElement, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { globalState } from "./store/state";
import useReducerPlus from "./hooks/useReducerPlus";

export const RequireAuth = ({ children }: { children: ReactElement }) => {
    const { user } = globalState();
    const navigate = useNavigate();
    const [state,update] = useReducerPlus({isLoading:true})

    useEffect(() => {

        if (!user) {            
            navigate("/sign-in")
        } else {
            update({isLoading:false})
            return 
        }
        
    }, [user, navigate]);

    if(state.isLoading){
        return <div>Loading...</div>
    }
    return children;
};
