import  format  from "pg-format";
import { TUserRequest, TuserResponse } from "../../interfaces/userInterfaces";
import { QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/userSchema";
import * as bcrypt from "bcryptjs"

export  const createUserService= async(data:TUserRequest):Promise<TuserResponse>=>{ 

   data.password=await bcrypt.hash(data.password,8); 
  const queryString:string=format(
    `
    INSERT INTO
          users(%I)
     VALUES
           (%L)
    RETURNING
        *;
`,
Object.keys(data),
Object.values(data)
)
   const queryResult:QueryResult<TuserResponse>=await client.query(queryString)
   const newUser=responseUserSchema.parse(queryResult.rows[0])
   console.log(newUser);
   
   return  newUser
}