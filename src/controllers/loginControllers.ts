import { Request, Response } from "express";
import {TLoginRequest,TLoginResponse} from "../interfaces/loginInterfaces";
import { loginUserService } from "../services/loginServices/loginUserService";

export const loginUserDataController=async(req:Request,res:Response):Promise<Response>=>{
const data:TLoginRequest=req.body;

const token:TLoginResponse=await loginUserService(data);

 return res.status(201).json(token);

}

