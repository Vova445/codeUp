import express from 'express';
import QRCode from 'qrcode';
import speakeasy from 'speakeasy';
import { User } from '../../models/userModel.js';
import jwt from 'jsonwebtoken';
const authRouter = express.Router();

authRouter.post('/generate-qr-code-for-totp', async (req, res) => {
  try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'No token provided' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const secret = speakeasy.generateSecret();
      user.twoFaSecretGoogleAuth = secret.base32;
      await user.save();

      const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
      res.json({ qrCodeUrl, secret: secret.base32 });
  } catch (error) {
      console.error('Error generating QR code:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

authRouter.post('/verify-google-code', async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'No token provided' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const { token: codeToken } = req.body;
      const verified = speakeasy.totp.verify({
        secret: user.twoFaSecretGoogleAuth,
        encoding: 'base32',
        token: codeToken
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
