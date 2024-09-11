import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User } from '../../models/userModel.js';

const emailTwoFactorRoutes = express.Router();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

emailTwoFactorRoutes.post('/send-2fa-email', async (req, res) => {
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
      user.twoFAMethod = 'email';
      await user.save();
  
      const confirmationToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: 'Your Two-Factor Authentication Code',
        html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
          <h2 style="color: #333;">Two-Factor Authentication</h2>
          <p style="font-size: 16px; color: #555;">Click the button below to verify your email address:</p>
          <a href="${process.env.VITE_API_URL}/api/verify-2fa/${confirmationToken}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p style="font-size: 14px; color: #888; margin-top: 20px;">This link will be valid for 15 minutes.</p>
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
  

  emailTwoFactorRoutes.get('/verify-2fa/:token', async (req, res) => {
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

export default emailTwoFactorRoutes;
