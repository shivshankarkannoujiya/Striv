import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json({ limit: `10kb` }));
app.use(express.urlencoded({ extended: true, limit: `10kb` }));
app.use(cookieParser());

import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/message', messageRouter);

export default app;
