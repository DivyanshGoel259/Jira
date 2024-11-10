import z from 'zod'

const UserSchema = z.object({
    clerk_user_id :z.string(),
    email :z.string().email(),
    name :z.string(),
    image_url :z.string().url(),
    id  :z.string().uuid(),
})

export type UserType = z.infer<typeof UserSchema>



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