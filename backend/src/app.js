import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

const allowedOrigin =
    process.env.NODE_ENV === 'production' ? 'https://striv.com' : 'http://localhost:5173';

app.use(
    cors({
        origin: allowedOrigin,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);
app.use(express.json({ limit: `10mb` }));
app.use(express.urlencoded({ extended: true, limit: `10mb` }));
app.use(cookieParser());

import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/message', messageRouter);

export default app;
