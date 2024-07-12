import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getItems } from "./controllers/itemsController";
import { errorHandler } from "./errors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5174;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is online :)");
});

app.get('/items', getItems)
app.all('/items', errorHandler)
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});