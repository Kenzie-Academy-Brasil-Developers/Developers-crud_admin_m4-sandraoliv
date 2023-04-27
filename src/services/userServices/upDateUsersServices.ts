import format from "pg-format"
import { TUserRequest,  TuserResponse } from "../../interfaces/userInterfaces"
import {  QueryResult } from "pg"
import { client } from "../../database"
import { responseUserSchema} from "../../schemas/userSchema"

export  const upDateUsersServices= async(id :number, data:Partial<TUserRequest>):Promise<TuserResponse>=>{ 
    const queryString:string= format(
  `
  UPDATE users
  SET (%I) = ROW (%L)
  WHERE 
      id = $1
  RETURNING
          *;
  `,
  Object.keys(data),
  Object.values(data)
)

const queryResult:QueryResult<TuserResponse>=await client.query(queryString,[id])
const newUser:TuserResponse= responseUserSchema.parse(queryResult.rows[0]) 

return   newUser

}