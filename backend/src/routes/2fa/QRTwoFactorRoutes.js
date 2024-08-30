import express from 'express';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';
import speakeasy from 'speakeasy';
import { User } from '../../models/userModel.js';

const qrRoutes = express.Router();

qrRoutes.post('/generate-qr', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const secret = speakeasy.generateSecret();
    user.twoFASecret = secret.base32;
    await user.save();

    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

    res.status(200).json({ qrCodeUrl });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

qrRoutes.post('/verify-qr', async (req, res) => {
  const { code } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFASecret,
      encoding: 'base32',
      token: code,
    });

    if (verified) {
      user.isTwoFAEnabled = true;
      await user.save();
      res.status(200).json({ message: 'QR Code verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid QR Code' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

qrRoutes.get('/check-qr-verification', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isVerified = user.isTwoFAEnabled;

    res.status(200).json({ isVerified });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

export default qrRoutes;
