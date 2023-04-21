import { Router} from "express";
import { createUsersControler, listUserController, upDateUserController } from "../controllers/usersControllers";
import { ensureEmailNotExists } from "../middlewares/ensureEmailNot ExistsMiddleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists";
import { serializedUserDataMiddleware } from "../middlewares/serializeUserData";
import { requestUserSchema, updateUserSchema } from "../schemas/userSchema";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValidMiddleare";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdminMiddleware";

export  const userRoutes:Router=Router()
 userRoutes.post("",serializedUserDataMiddleware(requestUserSchema),ensureEmailNotExists,createUsersControler)
 userRoutes.get("",ensureTokenIsValidMiddleware,listUserController)
 userRoutes.get("/profile",ensureTokenIsValidMiddleware )
 userRoutes.patch("/:id",serializedUserDataMiddleware(updateUserSchema),ensureUserExistsMiddleware,ensureEmailNotExists,ensureIsAdminMiddleware,upDateUserController)
 userRoutes.delete("/:id",ensureUserExistsMiddleware,ensureTokenIsValidMiddleware,ensureIsAdminMiddleware)
 userRoutes.put(":id/recover",ensureUserExistsMiddleware,ensureTokenIsValidMiddleware)



