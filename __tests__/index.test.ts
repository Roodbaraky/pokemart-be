import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express, { Express, Request, Response } from 'express';
import { getItems } from '../src/controllers/itemsController';
import { errorHandler } from '../src/errors';

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
    app.all('/items', errorHandler)

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

  it('should return 404 for non-existent routes', async () => {
    const res = await request(app).get('/non-existent-route');
    expect(res.status).toBe(404);
  });

  it('should return 405 for invalid methods on existing routes', async () => {
    const resPost = await request(app).post('/items');
    expect(resPost.status).toBe(405);

    const resPut = await request(app).put('/items');
    expect(resPut.status).toBe(405);

    const resDelete = await request(app).delete('/items');
    expect(resDelete.status).toBe(405);
  });
});
