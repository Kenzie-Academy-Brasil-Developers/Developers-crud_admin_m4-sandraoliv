import format from "pg-format"
import { TUserRequest, TuserResponse } from "../../interfaces/userInterfaces"
import { QueryConfig, QueryResult } from "pg"
import { client } from "../../database"

export  const upDateUsersServices= async(id :number, data:Partial<TUserRequest>):Promise<TuserResponse>=>{ 
    const queryString:string= format(
  `
  UPDATE users
  SET (% I) = ROWS (% L)
  RETURNING
     "id","name","email","admin","active";
  `,
  Object.keys(data),
  Object.values(data)
)
  const  queryConfig:QueryConfig={
    text:queryString,
    values:[id]
}

const queryResult:QueryResult<TuserResponse>=await client.query(queryConfig)
return queryResult.rows[0]  

}