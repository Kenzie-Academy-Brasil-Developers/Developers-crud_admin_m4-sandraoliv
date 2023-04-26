import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";

export const ensureUserIsActiveMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    
    const { id } = req.params;
  
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
    const queryResult:QueryResult = await client.query(queryConfig)
    const user = queryResult.rows[0];
    
        if (!user.active) {
            throw new AppError("User already active", 400);
        }
        return next();
    }