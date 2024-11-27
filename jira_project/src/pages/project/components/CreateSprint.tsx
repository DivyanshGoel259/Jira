import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { DatePickerWithRange } from "./DatePicker";
import useReducerPlus from "../../../hooks/useReducerPlus";
import { useParams } from "react-router-dom";
import { createNewSprint } from "../api";
import toast from "react-hot-toast";

export function CreateSprint() {
  const { projectId } = useParams();
  const [state, update] = useReducerPlus({
    isLoading: false,
    sprint: { name: "", startDate: "", endDate: "", projectId: projectId },
  });

  const handleClick = async () => {
    update({ isLoading: true });
    try {
      const [_, err] = await createNewSprint(state.sprint);
      if (err) {
        throw err;
      }
      toast.success("Sprint created successfully");
    } catch (err: any) {
      toast.error(err.message);
    }
    update({ isLoading: false });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Sprint</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Sprint</DialogTitle>
          <DialogDescription>Create a new sprint here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              onChange={(e) => {
                update({ sprint: { name: e.target.value } });
              }}
              id="name"
              placeholder="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Sprint Duration
            </Label>
            <DatePickerWithRange
              onDateChange={(from: string, to: string) => {
                update({ sprint: { startDate: from, endDate: to } });
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick} type="submit">
            Create Sprint
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
