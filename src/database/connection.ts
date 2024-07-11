import * as dotenv from 'dotenv';
import { Pool, PoolConfig } from 'pg';

dotenv.config();

const ENV = process.env.NODE_ENV || 'development';

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

const config: PoolConfig = {};

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}else{
  config.connectionString = process.env.DATABASE_URL;
}

export const pool = new Pool(config);
