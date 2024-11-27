import z from "zod";

const user = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  name: z.string(),
  image_url: z.string().optional(),
  password: z.string().optional(),
});

export type UserType = z.infer<typeof user>;

const signInInputsType = z.object({
  email: z.string().email(),
  password: z.string(),
});

const createOrganizationType = z.object({
  orgName: z.string(),
  orgSlug: z.string(),
  logo: z.string().url(),
});
export type createOrganizationType = z.infer<typeof createOrganizationType>;

export type SignInInputType = z.infer<typeof signInInputsType>;

export interface CreateOrganizationType {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
}

export interface Sprint {
  created_at:string
  end_date:string
  id:string
  name:string
  start_date:string
  status: string
  updated_at:string,
  newStatus?:string
}

export interface Issue{
  id? :string,
  title :string,
  description :string ,
  status:string,
  "order"?:string,
  priority:string,
  asignee_id:string,
  reporter_id?:string,
  project_id:string,
  sprint_id :string,
}

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface GetIssue {
  id?: string;
  title: string;
  created_at: string;
  updated_at: string;
  description: string;
  status: string;
  order?: number;
  priority: Priority;
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
