import { describe, it, expect, vi } from 'vitest';
import { fetchOffers } from '../src/models/offers';
import { pool } from '../src/database/connection';

vi.mock('../src/database/connection', () => ({
  pool: {
    query: vi.fn(),
  },
}));

describe('fetchOffers', () => {
  it('should call pool.query with default parameters', async () => {
    const expectedQuery = 'SELECT * FROM offers LIMIT $1 OFFSET $2';
    const expectedValues = [98, 0];
    await fetchOffers();
    expect(pool.query).toHaveBeenCalledWith(expectedQuery, expectedValues);
  });

  it('should call pool.query with custom limit and page', async () => {
    const query = { limit: 50, page: 2 };
    const expectedQuery = 'SELECT * FROM offers LIMIT $1 OFFSET $2';
    const expectedValues = [50, 2];
    await fetchOffers(query);
    expect(pool.query).toHaveBeenCalledWith(expectedQuery, expectedValues);
  });

  it('should call pool.query with item name filter', async () => {
    const query = { limit: 50, page: 2 };
    const params = { itemName: 'poke-ball' };
    const expectedQuery = 'SELECT * FROM offers WHERE offers.name LIKE $1 LIMIT $2 OFFSET $3';
    const expectedValues = ['%poke-ball%', 50, 2];
    await fetchOffers(query, params);
    expect(pool.query).toHaveBeenCalledWith(expectedQuery, expectedValues);
  });

  it('should handle string values for limit and page', async () => {
    const query = { limit: 30, page: 1 };
    const expectedQuery = 'SELECT * FROM offers LIMIT $1 OFFSET $2';
    const expectedValues = [30, 1];
    await fetchOffers(query);
    expect(pool.query).toHaveBeenCalledWith(expectedQuery, expectedValues);
  });

  it('should handle negative values for limit and page', async () => {
    const query = { limit: -10, page: -1 };
    const expectedQuery = 'SELECT * FROM offers LIMIT $1 OFFSET $2';
    const expectedValues = [-10, -1];
    await fetchOffers(query);
    expect(pool.query).toHaveBeenCalledWith(expectedQuery, expectedValues);
  });

  it('should handle missing query object', async () => {
    const expectedQuery = 'SELECT * FROM offers LIMIT $1 OFFSET $2';
    const expectedValues = [98, 0];
    await fetchOffers();
    expect(pool.query).toHaveBeenCalledWith(expectedQuery, expectedValues);
  });
});
