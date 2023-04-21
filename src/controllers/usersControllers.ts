import { Request, Response } from "express"
import { createUserService } from "../services/userServices/createUserService"
import { TUserRequest, TuserResponse } from "../interfaces/userInterfaces"
import { listUsersServices } from "../services/userServices/listUsersServics"
import { upDateUsersServices } from "../services/userServices/upDateUsersServices"


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