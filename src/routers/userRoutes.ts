import { Router} from "express";
import { createUsersControler, listUserController, listUserProfileController, recoverUserController, removeUserController, upDateUserController } from "../controllers/usersControllers";
import { ensureEmailNotExists } from "../middlewares/ensureEmailNot ExistsMiddleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists";
import { serializedUserDataMiddleware } from "../middlewares/serializeUserData";
import { requestUserSchema, updateUserSchema } from "../schemas/userSchema";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValidMiddleare";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdminMiddleware";
import { ensureUserIsActiveMiddleware} from "../middlewares/ensureUserIsActiveMiddleware";
import { ensureUserIdIsTheOwnerOfAcount } from "../middlewares/ensureUserIdIsTheOwnerOfAcount";

export  const userRoutes:Router=Router()
 userRoutes.post("",
 serializedUserDataMiddleware(requestUserSchema),
 ensureEmailNotExists,
 createUsersControler)

 userRoutes.get("",
 ensureTokenIsValidMiddleware,
 ensureIsAdminMiddleware,
 listUserController)

 userRoutes.get("/profile",
 ensureTokenIsValidMiddleware,
 ensureUserIdIsTheOwnerOfAcount,
 listUserProfileController )

 userRoutes.patch("/:id",
 serializedUserDataMiddleware(updateUserSchema),
 ensureTokenIsValidMiddleware,
 ensureUserExistsMiddleware,
 ensureUserIdIsTheOwnerOfAcount,
 ensureEmailNotExists,
 upDateUserController)

 userRoutes.delete("/:id",
 ensureTokenIsValidMiddleware,
 ensureUserIdIsTheOwnerOfAcount,
 ensureUserExistsMiddleware,
 removeUserController)

 userRoutes.put("/:id/recover",
 ensureTokenIsValidMiddleware,
 ensureIsAdminMiddleware,
 ensureUserExistsMiddleware,
 ensureUserIsActiveMiddleware,
 recoverUserController)



