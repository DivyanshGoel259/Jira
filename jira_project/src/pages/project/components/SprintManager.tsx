import { useState, useEffect } from "react";
import { Sprint } from "../../../types";
import { format, formatDistanceToNow, isAfter, isBefore } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import toast from "react-hot-toast";
import useReducerPlus from "../../../hooks/useReducerPlus";
import { updateSprintStatus } from "../api";

export const SprintManager = ({
  sprints,
  sprint,
  setSprint,
}: {
  sprints: Sprint[];
  sprint: Sprint;
  setSprint: React.Dispatch<React.SetStateAction<Sprint>>;
}) => {
  const [status, setStatus] = useState(sprint.status);
  const [state, update] = useReducerPlus({ isLoading: false });
  const [buttonStatus, setButtonStatus] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const startDate = new Date(sprint.start_date);
    const endDate = new Date(sprint.end_date);
    if (
      isBefore(now, endDate) &&
      isAfter(now, startDate) &&
      status === "PLANNED"
    ) {
      setButtonStatus("canStart");
    } else if (status === "ACTIVE") {
      setButtonStatus("canEnd");
    } else {
      setButtonStatus(null);
    }
  }, [sprint, status]);

  const handleChangeSprint = (value: string) => {
    const currentSprint = sprints.find((s) => s.id === value)!;
    setSprint(currentSprint);
    setStatus(currentSprint.status); // Update status when sprint is changed
  };

  const handleStatusText = () => {
    const now = new Date();
    const startDate = new Date(sprint.start_date);
    const endDate = new Date(sprint.end_date);

    if (sprint.status === "COMPLETED") {
      return `Sprint is ended`;
    }
    if (sprint.status === "ACTIVE" && isAfter(now, endDate)) {
      return `Overdue by ${formatDistanceToNow(endDate)}`;
    }
    if (sprint.status === "PLANNED" && isBefore(now, startDate)) {
      return `Starts in ${formatDistanceToNow(startDate)}`;
    }
    return null;
  };

  const handleStatusChange = async (newStatus: string) => {
    update({ isLoading: true });
    try {
      const updatedSprint = { ...sprint, newStatus };
      const [data, err] = await updateSprintStatus(updatedSprint);
      if (err) {
        throw err;
      }
      setStatus(data.status);
    } catch (err: any) {
      toast.error(err.message);
    }
    update({ isLoading: false });
  };

  return (
    <div className="p-2">
      <div className="md:flex md:justify-between md:gap-4">
        <Select defaultValue={sprint.id} onValueChange={handleChangeSprint}>
          <SelectTrigger className="w-full bg-slate-900 self-start">
            <SelectValue placeholder="Select Sprint" />
          </SelectTrigger>
          <SelectContent>
            {sprints.map((sprint) => (
              <SelectItem key={sprint.id} value={sprint.id}>
                {sprint.name} (
                {format(new Date(sprint.start_date), "MMM d, yyyy")}) to{" "}
                {format(new Date(sprint.end_date), "MMM d, yyyy")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          {buttonStatus === "canStart" && (
            <Button
              onClick={() => {
                handleStatusChange("ACTIVE");
              }}
              className="mt-3 md:mt-0 bg-green-600 text-white"
            >
              Start Sprint
            </Button>
          )}
          {buttonStatus === "canEnd" && (
            <Button
              onClick={() => {
                handleStatusChange("COMPLETED");
              }}
              className="mt-3 md:mt-0 bg-red-600 text-white"
            >
              End Sprint
            </Button>
          )}
        </div>
      </div>
      <div className="mt-2">
        {handleStatusText() && <Badge>{handleStatusText()}</Badge>}
      </div>
    </div>
  );
};
