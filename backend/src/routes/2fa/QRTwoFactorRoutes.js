import express from 'express';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';
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
    
    const randomCode = Math.floor(10000000 + Math.random() * 90000000).toString();
    user.twoFASecret = randomCode;
    user.twoFAMethod = 'qr'; // Встановлюємо метод
    await user.save();

    const qrCodeUrl = await QRCode.toDataURL(randomCode);

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

    const verified = user.twoFASecret === code;

    if (verified) {
      user.isTwoFAEnabled = true;
      await user.save();
      res.status(200).json({ message: 'Code verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid code' });
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