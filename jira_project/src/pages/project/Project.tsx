import { useParams } from "react-router-dom";
import useReducerPlus from "../../hooks/useReducerPlus";
import { getAllSprints, getProjectapi } from "./api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { CreateSprint } from "./components/CreateSprint";
import { Sprint } from "../../types";
import { SprintBoard } from "./components/SprintBoard";
import BarLoader from "../../components/barLoader";

export const Project = () => {
  const [state, update] = useReducerPlus({
    isLoading: false,
    project: { id: "", name: "", key: "" },
  });
  const [sprints, setSprints] = useState<Array<Sprint>>();
  const { projectId } = useParams();
  const getProject = async () => {
    update({ isLoading: true });
    try {
      if (!projectId) {
        throw new Error("Can't find project");
      }
      const [data, err] = await getProjectapi(projectId);
      if (err) {
        throw new Error("Couldn't get project");
      }
      update({ project: data });
    } catch (err: any) {
      toast.error(err.message);
    }
    update({ isLoading: false });
  };

  const getSprints = async () => {
    update({ isLoading: true });
    try {
      if (!projectId) {
        throw new Error("Can't find project");
      }
      const [data, err] = await getAllSprints(projectId);
      if (err) {
        throw err;
      }
      setSprints(data);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getProject();
    getSprints();
  }, []);

  return (
    <div>
      {state.isLoading && (
        <div>
          <BarLoader />
        </div>
      )}

      <div className="p-4">
        <div className="md:flex md:justify-between ">
          <div className="mt-4 flex justify-center md:flex md:justify-start text-4xl md:text-5xl bg-gradient-to-r from-blue-300 via-white to-blue-300 text-transparent bg-clip-text font-bold">
            {state.project.name}
          </div>
          <div className="mt-4 flex justify-center flex-col">
            <CreateSprint />
          </div>
        </div>
        <div className="md:mt-8 mt-4">
          {sprints && sprints.length > 0 ? (
            <div>
              <SprintBoard sprints={sprints} projectId={projectId!} />
            </div>
          ) : (
            <div>You don't have any sprints ,Create one to start.</div>
          )}
        </div>
      </div>
    </div>
  );
};
