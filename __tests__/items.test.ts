import { describe, it, expect, vi } from 'vitest';
import { fetchItems } from '../src/models/items';
import { pool } from '../src/database/connection';

vi.mock('../src/database/connection', () => ({
  pool: {
    query: vi.fn(),
  },
}));

describe('fetchItems', () => {
  it('should call pool.query with default parameters', async () => {
    const expectedQuery = 'SELECT * from items LIMIT 98 OFFSET 0;';
    await fetchItems();
    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });

  it('should call pool.query with custom limit and page', async () => {
    const query = { limit: 50, page: 2 };
    const expectedQuery = 'SELECT * from items LIMIT 50 OFFSET 2;';
    await fetchItems(query);
    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });

  it('should handle string values for limit and page', async () => {
    const query = { limit: '30', page: '1' };
    const expectedQuery = 'SELECT * from items LIMIT 30 OFFSET 1;';
    await fetchItems(query);
    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });

  it('should handle negative values for limit and page', async () => {
    const query = { limit: -10, page: -1 };
    const expectedQuery = 'SELECT * from items LIMIT -10 OFFSET -1;';
    await fetchItems(query);
    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });

  it('should handle missing query object', async () => {
    const expectedQuery = 'SELECT * from items LIMIT 98 OFFSET 0;';
    await fetchItems();
    expect(pool.query).toHaveBeenCalledWith(expectedQuery);
  });
});
