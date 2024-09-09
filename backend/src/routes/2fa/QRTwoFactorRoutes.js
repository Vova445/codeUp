import express from 'express';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';
import { User } from '../../models/userModel.js';

const qrRoutes = express.Router();

// Функція для перевірки, чи є IP адреса IPv4
const isIPv4 = (ip) => {
  return /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/.test(ip);
}

const extractIPv4 = (header) => {
  if (!header) return '';
  const ips = header.split(',').map(ip => ip.trim());
  return ips.find(ip => isIPv4(ip)) || '';
}


qrRoutes.post('/generate-qr', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    let user;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    } else {
      user = await User.findOne({ isTwoFAEnabled: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    const randomCode = Math.floor(10000000 + Math.random() * 90000000).toString();
    user.twoFASecret = randomCode;
    user.twoFAMethod = 'qr';
    user.qrCodeGeneratedIp = extractIPv4(req.headers['x-forwarded-for']) || req.connection.remoteAddress;

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

  try {
    let user;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    } else {
      user = await User.findOne({ isTwoFAEnabled: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    const userIpAddress = extractIPv4(req.headers['x-forwarded-for']) || req.connection.remoteAddress;

    if (!user.qrCodeScannedIp) {
      user.qrCodeScannedIp = userIpAddress;
      await user.save();
    }

    if (user.qrCodeScannedIp !== userIpAddress) {
      console.log(`QR code scanned from IP: ${userIpAddress}`);
      console.log(`Expected IP: ${user.qrCodeScannedIp}`);
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
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
});


qrRoutes.get('/check-qr-verification', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    let user;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    } else {
      user = await User.findOne({ isTwoFAEnabled: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    const isVerified = user.isTwoFAEnabled;

    res.status(200).json({ isVerified });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

export default qrRoutes;
