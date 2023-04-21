import { Request, Response } from "express"
import { createUserService } from "../services/userServices/createUserService"
import { TUserRequest, TuserResponse } from "../interfaces/userInterfaces"
import { listUsersServices } from "../services/userServices/listUsersServics"
import { upDateUsersServices } from "../services/userServices/upDateUsersServices"
import { listUserProfileServices } from "../services/userServices/listUserProfile"
import { removeUserServices } from "../services/userServices/removeUserServices"
import { recoverUserServices } from "../services/userServices/recoverUserServices"


 export const createUsersControler = async(req:Request,res:Response):Promise<Response>=>{

   const data:TUserRequest=req.body
   const newUser:TuserResponse= await createUserService(data)

   return  res.status(201).json(newUser)
}

export const listUserController =async (req:Request,res:Response):Promise<Response>=>{

  const users= await listUsersServices()

  return res.json(users)
}

export const upDateUserController =async (req:Request,res:Response):Promise<Response>=>{

const id:number=parseInt(req.params.id)
const data:Partial<TUserRequest>=req.body

  const newUser= await upDateUsersServices(id,data)
  
   return res.json(newUser)
}

export const listUserProfileController=async(req:Request,res:Response):Promise<Response>=>{

  const id:number=parseInt(req.params.id)
  const user= await listUserProfileServices(id)

  return res.json(user)
}

export const removeUserController=async(req:Request,res:Response):Promise<Response>=>{

  const id:number=parseInt(req.params.id)
  const result= await removeUserServices(id)

  return res.status(204).send();
}

export const recoverUserController=async (req:Request,res:Response):Promise<Response>=>{
  const id:number=parseInt(req.params.id)
  const user:TuserResponse= await recoverUserServices(id)

  return res.json(user)
}