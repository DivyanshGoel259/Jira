import z from "zod";

const UserSchema = z.object({
  G_id: z.string().optional(),
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().optional(),
  image_url: z.string().url().optional(),
  password: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;

export interface OrganizationSchema {
  id?: string;
  orgName: string;
  orgSlug: string;
  logo: URL;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrgMemberSchema {
  id?: string;
  member_id: string;
  organization_id: string;
  role: Roles;
  createdAt?: string;
  updatedAt?: string;
}

export enum Roles {
  ADMIN = "admin",
  MEMBER = "member",
}

export enum SprintStatus {
  PLANNED,
  ACTIVE,
  COMPLETED,
}

export enum IssueStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export enum IssuePriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export interface GetIssue {
  id?: string;
  title: string;
  created_at: string;
  updated_at: string;
  description: string;
  status: IssueStatus;
  order?: number;
  priority: IssuePriority;
  asignee_id: string;
  reporter_id?: string;
  project_id: string;
  sprint_id: string;
  asignee_name?: string;
  reporter_name?: string;
  asignee_email?: string;
  reporter_email?: string;
  asignee_imageUrl?: string;
  reporter_imageUrl?: string;
}
