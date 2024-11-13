import z from 'zod'

const UserSchema = z.object({
    G_id:z.string().optional(),
    id:z.string().uuid(),
    email :z.string().email(),
    name :z.string().optional(),
    image_url :z.string().url().optional(),
    password:z.string()
})

export type UserType = z.infer<typeof UserSchema>

export interface  OrganizationSchema {
    id?:string,
    orgName:string,
    orgSlug:string,  
    logo:URL,
    userId:string  
    createdAt ?:string,
    updatedAt?:string
}

export interface OrgMemberSchema{
    id?:string,
    member_id:string,
    organization_id:string,
    role:Roles
    createdAt?:string,
    updatedAt?:string
}

export enum Roles{
    ADMIN="admin",
    MEMBER="member"
}

export enum SprintStatus {
    PLANNED,
    ACTIVE,
    COMPLETED
}

export enum IssueStatus {
    TODO,
    IN_PROGRESS,
    IN_REVIEW,
    DONE
}

export enum IssuePriority{
    LOW,
    MEDIUM,
    HIGH,
    URGENT
}