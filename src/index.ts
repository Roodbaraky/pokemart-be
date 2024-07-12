import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import 'dotenv/config'

import { getItems } from "./controllers/itemsController";
import { errorHandler } from "./errors";
import { getOffers } from "./controllers/offersController";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5174;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is online :)");
});

app.get('/items', getItems)
app.all('/items', errorHandler)

app.get('/offers',getOffers)
app.get('/offers/:itemName', getOffers)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});