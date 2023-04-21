import { QueryResult } from "pg";
import "dotenv/config";
import { TuserResponse } from "../../interfaces/userInterfaces";
import { client } from "../../database";

 export const listUsersServices= async():Promise<Array<TuserResponse>>=>{

    const queryString:string=`
    SELECT 
        "id","name","email","admin","active"

    FROM 
        users;
    
    `
    const queryResult:QueryResult<TuserResponse>=await client.query(queryString)
    return queryResult.rows

}