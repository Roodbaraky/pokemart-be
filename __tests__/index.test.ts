import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express, { Express, Request, Response } from 'express';
import { getItems } from '../src/controllers/itemsController';

vi.mock('../src/controllers/itemsController', () => ({
  getItems: vi.fn((req: Request, res: Response) => {
    res.status(200).send([{ id: 1, name: 'Item 1' }]);
  }),
}));

describe('Express App', () => {
  let app: Express;
  let server: any;

  beforeAll(() => {
    app = express();
    app.get("/", (req: Request, res: Response) => {
      res.send("Server is online :)");
    });
    app.get('/items', getItems);

    server = app.listen(5175);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return "Server is online :)" on the root route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Server is online :)');
  });

  it('should call getItems on /items route and return items', async () => {
    const res = await request(app).get('/items');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: 'Item 1' }]);
  });
});
