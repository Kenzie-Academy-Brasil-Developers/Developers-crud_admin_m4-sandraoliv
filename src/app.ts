 import 'express-async-errors' 
 
import express, { Application, json } from 'express'
import { userRoutes } from './routers/userRoutes'

import { loginRouter } from './routers/loginRoutes'
import { handleErrors } from './errors/errors'

const app: Application = express()
app.use(json())

app.use("/users",userRoutes)

app.use("/login",loginRouter)

app.use(handleErrors)
export default app
