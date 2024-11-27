import toast from "react-hot-toast";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../../../components/ui/drawer";
import useReducerPlus from "../../../hooks/useReducerPlus";
import { createIssue, getOrganizationMembers } from "../api";
import { UserType } from "../../../types";
import { useEffect } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import MdEditor from "@uiw/react-md-editor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";

interface props {
  isOpen: boolean;
  onClose: () => void;
  sprintId: string;
  issueStatus: string;
  projectId: string;
  onIssueCreated: () => void;
}

export const CreateIssueDrawer = ({
  isOpen,
  onClose,
  sprintId,
  issueStatus,
  projectId,
  onIssueCreated,
}: props) => {
  const [state, update] = useReducerPlus({
    isLoading: false,
    orgMembers: [] as UserType[],
    issue: {
      title: "",
      description: "",
      asignee_id: "",
      priority: "",
      status: "",
      project_id: projectId,
      sprint_id: sprintId,
    },
  });
  const getOrgMembers = async () => {
    update({ isLoading: true });
    try {
      const [data, err] = await getOrganizationMembers();
      if (err) {
        throw err;
      }
      update({ orgMembers: data });
    } catch (err: any) {
      toast.error(err.message);
    }
    update({ isLoading: false });
  };
  const handleCreateIssue = async () => {
    update({ isLoading: true });
    try {
      const [_, err] = await createIssue(state.issue);
      if (err) {
        throw err;
      }
      toast.success("Issue created successfully");
      onClose();
      onIssueCreated();
    } catch (err: any) {
      toast.error(err.message);
    }
    update({ isLoading: false });
  };

  useEffect(() => {
    getOrgMembers();
  }, [isOpen]);
  useEffect(() => {
    update({ issue: { status: issueStatus } });
  }, [issueStatus]);
  return (
    <div>
      <Drawer open={isOpen} onClose={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Issue</DrawerTitle>
            <div className="mt-4">
              <Label htmlFor="title">Title</Label>
              <Input
                required
                onChange={(e) => {
                  update({ issue: { title: e.target.value } });
                }}
                className="mt-1"
                id="title"
                placeholder="give a title to issue"
              />
            </div>

            <div className="pt-2">
              <Label htmlFor="Asignee">Assignee</Label>
              <Select
                onValueChange={(e) => {
                  update({ issue: { asignee_id: e } });
                }}
              >
                <SelectTrigger className=" w-full mt-1">
                  <SelectValue placeholder="Select a Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {state.orgMembers?.map((member) => {
                      return (
                        <SelectItem value={member.id!}>
                          {member.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-2">
              <Label htmlFor="description">Description</Label>
              <MdEditor
                className="mt-1"
                id="description"
                value={state.issue.description}
                onChange={(value) => {
                  update({ issue: { description: value || "" } });
                }}
              />
            </div>
            <div className="pt-2">
              <Label htmlFor="Asignee">Priority</Label>
              <Select
                onValueChange={(e) => {
                  update({ issue: { priority: e } });
                }}
              >
                <SelectTrigger className=" w-full mt-1">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"LOW"}>Low</SelectItem>
                    <SelectItem value={"MEDIUM"}>Medium</SelectItem>
                    <SelectItem value={"HIGH"}>High</SelectItem>
                    <SelectItem value={"URGENT"}>Urgent</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-4">
              <Button onClick={handleCreateIssue}>Create Issue</Button>
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
