import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors/errors";

export const ensureUserExistsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id: number = req.params.id? parseInt(req.params.id):res.locals.id

    const queryString: string = `
    SELECT
        *
    FROM
        users
    WHERE
        id = $1;
`
const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
}

const queryResult:QueryResult=await client.query(queryConfig)

if (queryResult.rowCount === 0) {
    throw new AppError('User not found', 404)
}
return next()
}