import express from 'express'
import { errorHandler } from '../error/errorHandler.js'
import userRoutes from '../routes/userRoutes.js'
import emailTwoFactorRoutes from '../routes/2fa/emailTwoFactorRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import qrRoutes from '../routes/2fa/QRTwoFactorRoutes.js';
import phoneTwoFactorRoutes from '../routes/2fa/phoneTwoFactorRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function setupMiddlewares(app) {
  

   app.use('/api', userRoutes)
   app.use('/api', emailTwoFactorRoutes);
   app.use('/api', qrRoutes);
   app.use('/api', phoneTwoFactorRoutes);

   if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../../../frontend/dist')));
      
      app.get('*', (req, res) => {
          res.sendFile(path.join(__dirname, '../../../frontend/dist/index.html'));
      });
  }

   app.use(errorHandler)
}
