import express from 'express';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { User } from '../../models/userModel.js';
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

authRouter.post('/generate-qr-code-google', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.twoFaSecretGoogleAuth) {
      const secret = speakeasy.generateSecret({ name: 'YourAppName' });
      user.twoFaSecretGoogleAuth = secret.base32;
      user.twoFAMethod = 'googleAuth';
      await user.save();
    }

    const qrCodeUrl = await QRCode.toDataURL(speakeasy.otpauthURL({
      secret: user.twoFaSecretGoogleAuth,
      label: 'codeUp',
      algorithm: 'sha1'
    }));

    res.json({ qrCodeUrl });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

authRouter.post('/verify-google-code', async (req, res) => {
  const { code } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log('Secret:', user.twoFaSecretGoogleAuth);
    console.log('Code:', code);
    const verified = speakeasy.totp.verify({
      secret: user.twoFaSecretGoogleAuth,
      encoding: 'base32',
      token: code
    });

    if (verified) {
      user.isTwoFAEnabled = true;
      await user.save();
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default authRouter;
