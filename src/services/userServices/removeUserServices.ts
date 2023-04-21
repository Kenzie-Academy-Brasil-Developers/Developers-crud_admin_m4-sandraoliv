import { QueryResult } from "pg";
import { client } from "../../database";

export const removeUserServices = async (id: number): Promise<void> => {
    const queryString = `
    UPDATE 
      users 
    SET
      active = false
      WHERE id = $1;
    `;
    const queryResult:QueryResult = await client.query(queryString, [id]);
  };