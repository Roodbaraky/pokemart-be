import { NextFunction, Request, Response } from "express";

export const errorHandler = (req: Request, res: Response, next: NextFunction) => {
    if(req.method!=='GET'){
        res.status(405).send({ error: 'Invalid method' })
    }
    else{
        res.status(404).send({ error: 'Invalid route' })
    }
}