import { describe, it, expect, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { getOffers } from '../src/controllers/offersController';
import { fetchOffers } from '../src/models/offers';

vi.mock('../src/models/offers', () => ({
  fetchOffers: vi.fn(),
}));

describe('getOffers', () => {
  it('should call fetchOffers with query and params and send the result', async () => {
    const req = {
      query: { limit: 50, page: 2 },
      params: { itemName: 'poke-ball' },
    } as unknown as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    const mockOffers = { rows: [{ name: 'poke-ball', specialPrice: { quantity: 3, price: 500 }, tag: 'Buy 3 get 100 off' }] };
    (fetchOffers as any).mockResolvedValueOnce(mockOffers);

    await getOffers(req, res, next);

    expect(fetchOffers).toHaveBeenCalledWith(req.query, req.params);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockOffers.rows);
  });

  it('should handle errors and call next with error', async () => {
    const req = {
      query: {},
      params: {},
    } as unknown as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    const error = new Error('Database error');
    (fetchOffers as any).mockRejectedValueOnce(error);

    await getOffers(req, res, next);

    expect(fetchOffers).toHaveBeenCalledWith(req.query, req.params);
    expect(next).toHaveBeenCalledWith(error);
  });
});
