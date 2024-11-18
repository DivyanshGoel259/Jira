import { useNavigate } from "react-router-dom";
import { globalState } from "../store/state";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import useReducerPlus from "../hooks/useReducerPlus";
import { createNewProject } from "../pages/project/api";

export function CreateProjectModal() {
  const { organization } = globalState();
  const [state, update] = useReducerPlus({
    project: {
      name: "",
      description: "",
      key: "",
      orgId: organization?.selected?.id,
      role: organization?.selected?.role,
    },
    isLoading: false,
  });
  const handleInput = (e: any) => {
    const { id, value } = e.target;
    update({ project: { [id]: value } } as any);
  };
  const handleNewProject = async () => {
    update({ isLoading: true });
    try {
      const [data, err] = await createNewProject(state.project);
      if (err) {
        throw err;
      }
      toast.success("Project Created Succesfully");
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message);
    }
    update({ isLoading: false });
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Create Project</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Enter your project's details and start working on it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                onChange={handleInput}
                id="name"
                placeholder="Project name (Ex: Jira)"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="key" className="text-right">
                Key
              </Label>
              <Input
                onChange={handleInput}
                id="key"
                placeholder="Project key (Ex: KFCY)"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <textarea
                onChange={handleInput}
                cols={2}
                rows={2}
                id="description"
                className="col-span-3 bg-transparent"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleNewProject} type="submit">
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
