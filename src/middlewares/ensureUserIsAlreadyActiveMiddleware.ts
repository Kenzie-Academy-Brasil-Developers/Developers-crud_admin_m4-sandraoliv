import { QueryConfig } from "pg";
import { client } from "../database";
import { Tuser } from "../interfaces/userInterfaces";
import { AppError } from "../error.ts/errors";
import { NextFunction, Request, Response } from "express";

export const ensureUserIsAlreadyActiveMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    
    const { id } = res.locals;
    const queryString:string=`
    'SELECT *
     FROM 
          users
     WHERE id = $1'
    `
    const queryConfig:QueryConfig={
        text:queryString, 
        values: [id],
    }
    const queryResult = await client.query<Tuser>( queryConfig)
    const user = queryResult.rows[0];
    
        if (!user.active) {
            throw new AppError("User already active", 400);
        }
        return next();
    }