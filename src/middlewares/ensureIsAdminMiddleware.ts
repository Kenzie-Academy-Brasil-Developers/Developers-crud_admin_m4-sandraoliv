import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { QueryConfig } from "pg";
import { TUser } from "../__tests__/mocks/interfaces";
import { AppError } from "../errors/errors";

  export const ensureIsAdminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = res.locals;
  
    const queryString:string=`
     SELECT *
     FROM 
          users
     WHERE id = $1;
    `
    const queryConfig:QueryConfig={
        text:queryString, 
        values: [id],
    }
    const queryResult = await client.query<TUser>( queryConfig)
    const user = queryResult.rows[0];
   
        if (!user.admin) {
            throw new AppError("Insufficient Permission", 403);
        }
        return next();
    }
  
  

 