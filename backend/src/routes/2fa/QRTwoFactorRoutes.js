import express from 'express';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';
import { User } from '../../models/userModel.js';

const qrRoutes = express.Router();


qrRoutes.post('/generate-qr', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    let user;
    if (!token) {
      const { email } = req.body;
      if (!email) {
        return res.status(401).json({ message: 'No token or email provided' });
      }
      user = await User.findOne({ email });

      if (!user || !user.isTwoFAEnabled) {
        return res.status(401).json({ message: 'Account is not verified for Two-Factor Authentication' });
      }
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    const randomCode = Math.floor(10000000 + Math.random() * 90000000).toString();
    user.twoFASecret = randomCode;
    user.twoFAMethod = 'qr';

    user.qrCodeGeneratedIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    await user.save();

    const qrCodeUrl = await QRCode.toDataURL(randomCode);

    res.status(200).json({ qrCodeUrl });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token or request' });
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
    const forwardedIps = req.headers['x-forwarded-for'];
    const userIpAddress = forwardedIps ? forwardedIps.split(',')[0].trim() : req.connection.remoteAddress;

    if (!user.qrCodeScannedIp) {
      user.qrCodeScannedIp = userIpAddress;
      await user.save();
    }

    if (user.qrCodeScannedIp !== userIpAddress) {
      return res.status(403).json({ message: 'QR code scanned from an unauthorized device' });
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