import { client } from "../../database";
import * as bcrypt from "bcryptjs";
import {  Tuser } from "../../interfaces/userInterfaces";
import { QueryConfig, QueryResult } from "pg";
import { TLoginRequest, TLoginResponse } from "../../interfaces/loginInterfaces";
import { AppError } from "../../error.ts/errors";
import format from "pg-format";
import "dotenv/config";
import jwt from "jsonwebtoken"

export  const loginUserService= async(data:TLoginRequest):Promise<TLoginResponse>=>{  
  
   const queryString:string=format(
     `
   SELECT * FROM
      users
   WHERE
      email = %L;
 `,
 data.email
 )
 const queryConfig:QueryConfig={
   text:queryString,
   values:[data.email]
 }
    const queryResult :QueryResult<Tuser> = await client.query(queryString)
    const user=queryResult.rows[0]

   if(queryResult.rowCount === 0){
      throw new AppError("Wrong email/password.", 401);
   }
   const comparePassword:boolean =await bcrypt.compare(
      data.password,
      user.password
   )

   if(comparePassword===false){
      throw new AppError("Wrong email/password.", 401);
   }

   const token :string= jwt.sign(
   {
     id:user.id,
   },
    process.env.SECRET_KEY!,
   {
      expiresIn:"1d",
      subject: user.id.toString(),
   }
  )
    return{token}
 } 