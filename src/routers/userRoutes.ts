import { Router} from "express";
import { createUsersControler, listUserController, listUserProfileController, recoverUserController, removeUserController, upDateUserController } from "../controllers/usersControllers";
import { ensureEmailNotExists } from "../middlewares/ensureEmailNot ExistsMiddleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists";
import { serializedUserDataMiddleware } from "../middlewares/serializeUserData";
import { requestUserSchema, updateUserSchema } from "../schemas/userSchema";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValidMiddleare";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdminMiddleware";
import { ensureUserIsAlreadyActiveMiddleware } from "../middlewares/ensureUserIsAlreadyActiveMiddleware";
import { ensureUserIdIsTheOwnerOfAcount } from "../middlewares/ensureUserIdIsTheOwnerOfAcount";

export  const userRoutes:Router=Router()
 userRoutes.post("",serializedUserDataMiddleware(requestUserSchema),ensureEmailNotExists,createUsersControler)
 userRoutes.get("",ensureTokenIsValidMiddleware,ensureIsAdminMiddleware,listUserController)
 userRoutes.get("/profile",ensureTokenIsValidMiddleware,ensureUserExistsMiddleware,listUserProfileController )
 userRoutes.patch("/:id",serializedUserDataMiddleware(updateUserSchema),ensureUserExistsMiddleware,ensureUserIdIsTheOwnerOfAcount,ensureIsAdminMiddleware,ensureEmailNotExists,upDateUserController)
 userRoutes.delete("/:id",ensureUserExistsMiddleware,ensureTokenIsValidMiddleware,ensureUserIdIsTheOwnerOfAcount,ensureIsAdminMiddleware,removeUserController)
 userRoutes.put(":id/recover",ensureTokenIsValidMiddleware,ensureIsAdminMiddleware,ensureUserExistsMiddleware,ensureUserIsAlreadyActiveMiddleware,recoverUserController)



