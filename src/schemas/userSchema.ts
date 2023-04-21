import { z } from 'zod'

 export const userSchema = z.object({
    id: z.number(),
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z.string(),
    admin:z.boolean().optional().default(false),
    active:z.boolean().optional()
})
export  const requestUserSchema = userSchema.omit({ id: true })

export const responseUserSchema=  userSchema.omit({ password: true })

export const updateUserSchema = requestUserSchema.partial()