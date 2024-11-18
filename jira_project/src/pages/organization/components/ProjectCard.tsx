import { useEffect } from "react";
import useReducerPlus from "../../../hooks/useReducerPlus";
import { globalState } from "../../../store/state";
import { deleteProject, getProjects } from "../api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const ProjectCard = () => {
  const { organization } = globalState();
  const [state, update] = useReducerPlus({
    isLoading: false,
    projects: [],
    orgId: organization?.selected?.id,
  });

  const handleDeleteProject = async (projectId: string) => {
    try {
      if (organization?.selected.role !== "admin") {
        throw new Error("Only Admin can Delete Project");
      }
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this project"
      );
      if (isConfirmed) {
        const [_, err] = await deleteProject(projectId);
        if (err) {
          throw err;
        }
        toast.success("Project deleted successfully");
        getAllProjects();
      }
      return;
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const getAllProjects = async () => {
    update({ isLoading: true });
    try {
      const [data, err] = await getProjects(state.orgId!);
      if (err) {
        throw err;
      }
      update({ projects: data });
    } catch (err: any) {
      toast.error(err.message);
    }
    update({ isLoading: false });
  };
  useEffect(() => {
    getAllProjects();
  }, []);
  return (
    <div className="mt-8">
      {state.projects.length === 0 ? (
        <div>There are no projects. Create a new one to get started.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.projects.map((project: any) => (
            <div
              key={project.id}
              className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              {/* Delete Icon */}
              <button
                onClick={() => {
                  handleDeleteProject(project.id);
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>

              {/* Project Name */}
              <div className="text-xl font-bold text-white mb-3">
                {project.name}
              </div>

              {/* Project Description */}
              <div className="text-sm text-gray-400 mb-4">
                {project.description}
              </div>

              {/* View Project Link */}
              <Link
                to={`/project/${project.id}`}
                className="inline-block text-sm text-blue-500 hover:underline"
              >
                View Project
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
