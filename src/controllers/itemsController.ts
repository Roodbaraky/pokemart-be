import { NextFunction, Request, Response } from "express";
import { fetchItems } from "../models/items";

export const getItems = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query
    try {
        const items = await fetchItems(query)
        res.status(200).send(items.rows)
    } catch (error) { next(error) }


}
