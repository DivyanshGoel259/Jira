import { useEffect, useState } from "react";
import { GetIssue, Sprint } from "../../../types";
import { SprintManager } from "./SprintManager";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { status } from "../../../data/constants";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { CreateIssueDrawer } from "./CreateIssueDrawer";
import useReducerPlus from "../../../hooks/useReducerPlus";
import toast from "react-hot-toast";
import { getAllIssue, updateIssue } from "../api";
import { IssueCard } from "./IssueCard";
import BarLoader from "../../../components/barLoader";

const reorder = (list: GetIssue[], startIndex: number, lastIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(lastIndex, 0, removed);
  return result;
};

export const SprintBoard = ({
  sprints,
  projectId,
}: {
  sprints: Sprint[];
  projectId: string;
}) => {
  const [currentSprint, setCurrentSprint] = useState(
    sprints.find((s) => s.status === "ACTIVE") || sprints[0]
  );
  const [state, update] = useReducerPlus({
    isOpen: false,
    issueStatus: "",
    isLoading: false,
    issues: [] as GetIssue[],
  });

  const getIssues = async (sprintId: string) => {
    update({ isLoading: true });
    try {
      const [data, err] = await getAllIssue(sprintId);
      if (err) {
        throw err;
      }
      update({ issues: data });
    } catch (err: any) {
      toast.error(err.message);
    }
    update({ isLoading: false });
  };
  const onDragEnd = (result: any) => {
    if (currentSprint.status === "PLANNED") {
      toast.error("Start the sprint to update the Board");
    }
    if (currentSprint.status === "COMPLETED") {
      toast.error("Cannot update the board after the sprint has Completed");
    }
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const reOrderedList = [...state.issues];
    const sourceList = reOrderedList.filter(
      (list) => list.status === source.droppableId
    );
    const destinationList = reOrderedList.filter(
      (list) => list.status === destination.droppableId
    );
    if (destination.droppableId === source.droppableId) {
      const reOrderedCards = reorder(
        sourceList,
        source.index,
        destination.index
      );

      reOrderedCards.forEach((card: any, i: any) => {
        card.order = i;
      });
    } else {
      const [moved] = sourceList.splice(source.index, 1);
      moved.status = destination.droppableId;
      destinationList.splice(destination.index, 0, moved);

      sourceList.forEach((card, i) => {
        card.order = i;
      });

      destinationList.forEach((card, i) => {
        card.order = i;
      });
    }
    const sortedIssues = reOrderedList.sort(
      (a: any, b: any) => a.order - b.order
    );
    update({ issues: sortedIssues });
    onIssuesUpdate(sortedIssues);
  };

  async function onIssuesUpdate(updatedIssues: GetIssue[]) {
    update({ isLoading: true });
    try {
      const [data, err] = await updateIssue(updatedIssues);
      if (err) {
        throw err;
      }
      if (!data.success) {
        throw new Error("Failed to update issues");
      }
      getIssues(currentSprint.id);
    } catch (err: any) {
      toast.error(err.message);
    }
    update({ isLoading: false });
  }
  const onIssueCreated = () => {
    getIssues(currentSprint.id);
  };
  const handleClickCreateIssue = (statusL: string) => {
    update({ issueStatus: statusL });
    update({ isOpen: true });
  };

  useEffect(() => {
    getIssues(currentSprint.id);
  }, [currentSprint]);

  return (
    <div>
      <SprintManager
        sprint={currentSprint}
        setSprint={setCurrentSprint}
        sprints={sprints}
      />
      {state.isLoading && (
        <div>
          <BarLoader />
        </div>
      )}
      <div className="p-2">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="rounded-[8px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-slate-900 gap-4 mt-4 p-4">
            {status.map((column) => {
              return (
                <Droppable key={column.key} droppableId={column.key}>
                  {(provided) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        <h3 className="font-semibold text-center mb-2">
                          {column.name}
                        </h3>
                        {state.issues
                          ?.filter((issue) => issue.status == column.key)
                          .map((issue, index) => {
                            return (
                              <Draggable
                                index={index}
                                key={issue.id}
                                draggableId={issue.id!}
                                isDragDisabled={state.isLoading}
                              >
                                {(provided) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.dragHandleProps}
                                      {...provided.draggableProps}
                                    >
                                      <IssueCard issue={issue} />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                        {provided.placeholder}
                        {currentSprint.status !== "PLANNED" &&
                          currentSprint.status !== "COMPLETED" &&
                          column.key == "TODO" && (
                            <Button
                              variant={"ghost"}
                              className="w-full"
                              onClick={() => {
                                handleClickCreateIssue(column.key);
                              }}
                            >
                              <Plus />
                              Create Issue
                            </Button>
                          )}
                        <CreateIssueDrawer
                          isOpen={state.isOpen}
                          issueStatus={state.issueStatus}
                          onClose={() => {
                            update({ isOpen: false });
                          }}
                          onIssueCreated={onIssueCreated}
                          projectId={projectId}
                          sprintId={currentSprint.id}
                        />
                      </div>
                    );
                  }}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};
