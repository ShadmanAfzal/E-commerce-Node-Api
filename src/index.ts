import express from 'express';
import dotenv from 'dotenv';
import productsRouter from './routes/productsRoutes.js';
import userRouter from './routes/userRoutes.js';
import sellerRouter from './routes/sellerRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/v1/product', productsRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/seller', sellerRouter);

app.get('/',(req,res)=>{
    res.json({'success': true});
});

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});
