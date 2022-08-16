import express from 'express';
import dotenv from 'dotenv';
import productsRouter from './routes/productsRoutes.js';
import userRouter from './routes/userRoutes.js';
import sellerRouter from './routes/sellerRoutes.js';
import pg from "pg";
import { errorMiddleware } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

export const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect();


app.use('/api/v1/product', productsRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/seller', sellerRouter);
app.use(errorMiddleware);

app.get('/api/v1/health-check', (req,res)=> {
  res.json({success:true, message: 'server running ok'})
})

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});
