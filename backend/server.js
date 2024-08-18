import express from 'express';
import { setupMiddlewares } from './src/middlewares/middleware.js';
import connectDB from './src/database/database.js';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createServer() {
    const app = express();

    app.use(cors({
        exposedHeaders: ['Authorization'],
    }));
    app.use(morgan('dev'));
    app.use(express.json());

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../frontend/dist')));
        
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
        });
    }

    await connectDB();
    await setupMiddlewares(app);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

createServer();
