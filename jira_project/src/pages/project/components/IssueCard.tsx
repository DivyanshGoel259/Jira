import { formatDistanceToNow } from "date-fns";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { GetIssue, Priority } from "../../../types";

interface props {
  issue: GetIssue;
  showStatus: string;
  onDelete: () => void;
  onUpdate: () => void;
}

const priorityColor: Record<Priority, string> = {
  LOW: "border-green-600",
  MEDIUM: "border-yellow-300",
  HIGH: "border-red-400",
  URGENT: "border-orange-400",
};

export const IssueCard = ({ issue, showStatus, onDelete, onUpdate }: props) => {
  const created = formatDistanceToNow(new Date(issue.created_at), {
    addSuffix: true,
  });
  return (
    <div>
      <Card>
        <CardHeader
          className={`border-t-2 ${priorityColor[issue.priority]} rounded-lg`}
        >
          <CardTitle>{issue.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 -mt-3">
          {showStatus && <Badge>{issue.status}</Badge>}
          <Badge variant={"outline"}>{issue.priority}</Badge>
        </CardContent>
        <CardFooter className="gap-2 flex flex-col items-start space-y-3">
          <div className="flex space-x-2 w-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={issue?.asignee_imageUrl} />
              <AvatarFallback className="text-xs">
                {issue?.asignee_name![0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center text-xs text-gray-500">
              {issue.asignee_name}
            </div>
          </div>
          <div className="text-xs  text-gray-400 w-full">Created {created}</div>
        </CardFooter>
      </Card>
    </div>
  );
};
