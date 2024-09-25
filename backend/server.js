import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { setupMiddlewares } from './src/middlewares/middleware.js';
import connectDB from './src/database/database.js';
import cookieParser from 'cookie-parser';


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
        credentials: true,
        exposedHeaders: ['Authorization', 'Set-Cookie'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
        
        
    }));
    
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    app.use(morgan('dev'));
    app.use(express.json());

    app.use(cookieParser());
    app.use(session({
        secret: process.env.SESSION_SECRET ,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            secure: process.env.NODE_ENV === 'production',
        }
    }));

    await connectDB();
    await setupMiddlewares(app);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

createServer();
