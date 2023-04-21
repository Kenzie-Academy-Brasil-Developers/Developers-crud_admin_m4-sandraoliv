import { Router } from "express";
import { loginUserDataController } from "../controllers/loginControllers";

export  const loginRouter:Router=Router()

loginRouter.post("",loginUserDataController)



