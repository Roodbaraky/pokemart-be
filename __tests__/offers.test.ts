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
    const expectedQuery = 'SELECT * FROM offers  LIMIT 98 OFFSET 0 ;';
    await fetchOffers();
    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });

  it('should call pool.query with custom limit and page', async () => {
    const query = { limit: 50, page: 2 };
    const expectedQuery = 'SELECT * FROM offers  LIMIT 50 OFFSET 2 ;';
    await fetchOffers(query);
    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });

  it('should call pool.query with item name filter', async () => {
    const query = { limit: 50, page: 2 };
    const params = { itemName: 'poke-ball' };
    const expectedQuery = "SELECT * FROM offers WHERE offers.name LIKE 'poke-ball' LIMIT 50 OFFSET 2 ;";
    await fetchOffers(query, params);
    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });

  it('should handle string values for limit and page', async () => {
    const query = { limit: '30', page: '1' };
    const expectedQuery = 'SELECT * FROM offers  LIMIT 30 OFFSET 1 ;';
    await fetchOffers(query);
    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });

  it('should handle negative values for limit and page', async () => {
    const query = { limit: -10, page: -1 };
    const expectedQuery = 'SELECT * FROM offers  LIMIT -10 OFFSET -1 ;';
    await fetchOffers(query);
    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });

  it('should handle missing query object', async () => {
    const expectedQuery = 'SELECT * FROM offers  LIMIT 98 OFFSET 0 ;';
    await fetchOffers();
    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });
});
