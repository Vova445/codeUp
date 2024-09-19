import express from 'express';
// import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { User } from '../../models/userModel.js';
import jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';

const authRouter = express.Router();

authRouter.post('/generate-qr-code-google', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.twoFaSecretGoogleAuth) {
      const secret = authenticator.generateSecret();
      user.twoFAMethod = 'googleAuth';
      user.twoFaSecretGoogleAuth = secret;
      await user.save();
    }

    const qrCodeUrl = await QRCode.toDataURL(authenticator.keyuri(user.email, 'codeUp', user.twoFaSecretGoogleAuth));

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
    
    const isVerified = authenticator.check(code, user.twoFaSecretGoogleAuth);

    if (isVerified) {
      user.isTwoFAEnabled = true;
      await user.save();
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid code' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});



export default authRouter;