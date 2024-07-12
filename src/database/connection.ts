// connection.ts
import dotenv from 'dotenv';
import { Pool, PoolConfig } from 'pg';

dotenv.config();

const ENV = process.env.NODE_ENV || 'development';

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

const config: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
};

if (ENV === 'production') {
  config.max = 2
}

export const pool = new Pool(config);
