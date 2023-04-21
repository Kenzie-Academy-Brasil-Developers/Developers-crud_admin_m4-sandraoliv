import { z } from 'zod'
import { requestUserSchema, responseUserSchema, updateUserSchema, userSchema } from "../schemas/userSchema"

export type Tuser=z.infer<typeof userSchema>
 
export type TUserRequest=z.infer<typeof requestUserSchema>

export type TuserResponse =z.infer<typeof responseUserSchema >

export type TUserUpdateRequest = z.infer<typeof updateUserSchema>