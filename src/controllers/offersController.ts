import { NextFunction, Request, Response } from "express";
import { fetchOffers } from "../models/offers";

export const getOffers = async (req: Request, res: Response, next: NextFunction) => {
const query = req.query
const params = req.params
try{
    const offers = await fetchOffers(query, params)
    res.status(200).send(offers.rows[0])
} catch (error) { next(error) }

}