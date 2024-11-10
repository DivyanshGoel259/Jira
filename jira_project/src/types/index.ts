import z from "zod"

const user = z.object({
    clerk_user_id:z.string(),
    email:z.string().email(),
    name:z.string(),
    image_url:z.string()
})

export type UserType = z.infer<typeof user>

