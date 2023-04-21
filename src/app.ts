 import 'express-async-errors' 
 
import express, { Application, json } from 'express'
import { userRoutes } from './routers/userRoutes'
import { handleErrors } from './error.ts/errors'
import { loginRouter } from './routers/loginRoutes'

const app: Application = express()
app.use(json())

app.use("/users",userRoutes)

app.use("/login",loginRouter)

app.use(handleErrors)
export default app
