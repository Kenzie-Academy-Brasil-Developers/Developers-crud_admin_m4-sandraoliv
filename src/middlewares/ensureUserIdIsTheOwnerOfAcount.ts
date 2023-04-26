import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { Tuser } from "../interfaces/userInterfaces";
import { AppError } from "../errors/errors";

export const ensureUserIdIsTheOwnerOfAcount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = res.locals;
 
    const userId = parseInt(req.params.id);
  
    const queryConfig: QueryConfig = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };
  
    const queryResult = await client.query<Tuser>(queryConfig);
    const user = queryResult.rows[0];

    if (!user.admin && userId !== id) {
      
        throw new AppError("Insufficient Permission", 403);
    }
    
    return next();
  
  };
  