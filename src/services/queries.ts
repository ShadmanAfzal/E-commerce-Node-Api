import pg from "pg";

import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USERNAME,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
})

export default pool;