import { describe, it, expect, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { getItems } from '../src/controllers/itemsController';
import { fetchItems } from '../src/models/items';

vi.mock('../src/models/items', () => ({
  fetchItems: vi.fn(),
}));

describe('getItems', () => {
  it('should call fetchItems with query parameters and send the result', async () => {
    const req = {
      query: { limit: 50, page: 2 },
    } as unknown as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    const mockItems = { rows: [{ id: 1, name: 'Item 1' }] };
    (fetchItems as vi.Mock).mockResolvedValueOnce(mockItems);

    await getItems(req, res, next);

    expect(fetchItems).toHaveBeenCalledWith(req.query);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockItems.rows);
  });

  it('should handle errors and call next with error', async () => {
    const req = {
      query: {},
    } as unknown as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    const error = new Error('Database error');
    (fetchItems as vi.Mock).mockRejectedValueOnce(error);

    await getItems(req, res, next);

    expect(fetchItems).toHaveBeenCalledWith(req.query);
    expect(next).toHaveBeenCalledWith(error);
  });
});
