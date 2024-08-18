import express from 'express';
import { setupMiddlewares } from './src/middlewares/middleware.js';
import connectDB from './src/database/database.js';
import morgan from 'morgan';
import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();



async function createServer() {
    const app = express();

    app.use(cors({
        origin: 'https://code-up-omega.vercel.app/',
        exposedHeaders: ['Authorization'],
    }));
    app.use(morgan('dev'));
    app.use(express.json());

    await connectDB();
    await setupMiddlewares(app);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

createServer();
