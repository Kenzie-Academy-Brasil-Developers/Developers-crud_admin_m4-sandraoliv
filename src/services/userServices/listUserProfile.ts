import { QueryResult } from "pg"
import { TuserResponse } from "../../interfaces/userInterfaces"
import { client } from "../../database"

export const listUserProfileServices= async(id :number):Promise<TuserResponse>=>{
    
    const queryString:string=`
    SELECT 
       *
    FROM 
        users
    WHERE
        id=$1    
    RETURNING *;
    `
    const queryResult:QueryResult<TuserResponse>=await client.query(queryString,[id])
    return queryResult.rows[0]

}