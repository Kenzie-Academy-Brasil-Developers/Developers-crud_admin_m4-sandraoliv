import { QueryResult } from "pg";
import { client } from "../../database";
import { TuserResponse } from "../../interfaces/userInterfaces";
import { responseUserSchema } from "../../schemas/userSchema";

export const recoverUserServices = async (id: number):Promise<TuserResponse> => {
    const queryString = `
      UPDATE 
        users 
      SET
        active = true
      WHERE id = $1
      RETURNING *;
    `;
    const queryResult: QueryResult = await client.query(queryString, [id]);
    const user:TuserResponse= responseUserSchema.parse(queryResult.rows[0])
    return  user
  };
  