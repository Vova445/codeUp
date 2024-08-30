import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User } from '../models/userModel.js';

const twoFactorRoutes = express.Router();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

twoFactorRoutes.post('/send-2fa-email', async (req, res) => {
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

    const twoFACode = Math.floor(100000 + Math.random() * 900000);
    user.twoFACode = twoFACode;
    await user.save();

    const confirmationToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: 'Ваш код двофакторної автентифікації',
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #333;">Двофакторна автентифікація</h2>
        <p style="font-size: 16px; color: #555;">Натисніть на кнопку нижче, щоб підтвердити свою електронну адресу:</p>
        <a href="${process.env.VITE_API_URL}/api/verify-2fa/${confirmationToken}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Підтвердити адресу</a>
        <p style="font-size: 14px; color: #888; margin-top: 20px;">Цей лінк буде дійсний протягом 15 хвилин.</p>
      </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: '2FA email sent successfully' });
    });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

twoFactorRoutes.get('/verify-2fa/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.isTwoFAEnabled = true;
    await user.save();

    res.send(`<script>
      setTimeout(() => {
        window.location.href = '${process.env.VITE_API_URL}/two-factor-auth-success';
      }, 3000);
    </script>
    <p>Ваш обліковий запис успішно підтверджено! Ви будете перенаправлені назад через кілька секунд.</p>`);
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
});

export default twoFactorRoutes;
