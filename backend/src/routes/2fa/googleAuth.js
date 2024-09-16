import express from 'express';
import QRCode from 'qrcode';
import speakeasy from 'speakeasy';
import { User } from '../../models/userModel.js';

const authRouter = express.Router();

authRouter.post('/generate-qr-code', async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const secret = speakeasy.generateSecret();
      user.twoFaSecretGoogleAuth = secret.base32;
      await user.save();
  
      const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
      res.json({ qrCodeUrl, secret: secret.base32 });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  authRouter.post('/verify-google-code', async (req, res) => {
    try {
      const { userId, token } = req.body;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const verified = speakeasy.totp.verify({
        secret: user.twoFaSecretGoogleAuth, 
        encoding: 'base32',
        token
      });
  
      if (verified) {
        res.json({ message: 'Code is valid' });
      } else {
        res.status(400).json({ message: 'Invalid code' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default authRouter;
