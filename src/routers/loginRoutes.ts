import { Router } from "express";
import { loginUserDataController } from "../controllers/loginControllers";
import { serializedUserDataMiddleware } from "../middlewares/serializeUserData";
import { requestLoginSchema } from "../schemas/loginSchema";

export  const loginRouter:Router=Router()

loginRouter.post("",
serializedUserDataMiddleware(requestLoginSchema),
loginUserDataController)




