import { useParams } from "react-router-dom";
import useReducerPlus from "../../hooks/useReducerPlus";
import { globalState } from "../../store/state";
import { ProjectCard } from "./components/ProjectCard";
import { useEffect } from "react";
import BarLoader from "../../components/barLoader";

export const Organization = () => {
  const { orgId } = useParams();
  const [state, update] = useReducerPlus({ isLoading: false, error: Error });
  const { set, organization } = globalState();
  return (
    <div>
      <div className="p-4">
        <div className="mt-4 flex justify-center md:flex md:justify-start text-4xl md:text-5xl bg-gradient-to-r from-blue-300 via-white to-blue-300 text-transparent bg-clip-text font-bold">
          {organization?.selected?.name}'s Projects
        </div>
        <div className="mt-2">
          <ProjectCard />
        </div>
      </div>
    </div>
  );
};
