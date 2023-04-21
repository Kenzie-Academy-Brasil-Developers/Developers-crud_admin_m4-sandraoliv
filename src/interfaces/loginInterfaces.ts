import { z } from 'zod'
import { requestLoginSchema, responseLoginSchema } from '../schemas/loginSchema'

export type TLoginRequest=z.infer<typeof requestLoginSchema>

export type TLoginResponse=z.infer<typeof responseLoginSchema>