import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../models/userModel.js';

const router = express.Router();

router.get('/check-twofa-status', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ isTwoFAEnabled: user.isTwoFAEnabled });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;