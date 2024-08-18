import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; 
import { setupMiddlewares } from './src/middlewares/middleware.js';
import connectDB from './src/database/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function createServer() {
    const app = express();

    const allowedOrigins = [
        'https://code-up-omega.vercel.app',
        'http://localhost:3000',
    ];

    app.use(cors({
        origin: function (origin, callback) {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        exposedHeaders: ['Authorization'],
    }));
    app.use('/uploads', express.static(path.join(__dirname, '../../uploads')), (req, res, next) => {
        console.log(`Request for ${req.url}`);
        next();
    });    


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
