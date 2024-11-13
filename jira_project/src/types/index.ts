import z from "zod"

const user = z.object({
    id:z.string().optional(),
    email:z.string().email(),
    name:z.string(),
    image_url:z.string().optional(),
    password:z.string().optional(),
})

export type UserType = z.infer<typeof user>

const signInInputsType = z.object({
    email:z.string().email(),
    password:z.string(),
}) 

const createOrganizationType = z.object({
    orgName:z.string(),
    orgSlug:z.string(),
    logo:z.string().url()
})
export type createOrganizationType = z.infer<typeof createOrganizationType>

export type SignInInputType = z.infer<typeof signInInputsType>    
