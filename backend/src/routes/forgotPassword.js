import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User } from '../models/userModel.js';

const forgotPasswordRoutes = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  secure: false,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

forgotPasswordRoutes.post('/forgot-password', async (req, res) => {
  // const { email } = req.body;
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
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const apiUrl = process.env.VITE_API_URL.trim().replace(/\/+$/, '');
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <style>
          a:hover {
            transform: scale(1.08);
            opacity: 0.8;
            box-shadow: 0px 20px 30px rgba(0, 77, 64, 0.4);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
        </style>
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; text-align: center; padding: 40px; background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%); border-radius: 20px; box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15); max-width: 600px; margin: auto;">
          <h2 style="color: #00796b; font-size: 30px; margin-bottom: 20px;">🔑 Password Reset Request</h2>
          <p style="font-size: 18px; color: #004d40; margin-bottom: 20px;">You have requested to reset your password. Click the button below to proceed:</p>
          <a href="${apiUrl}/api/reset-password/${resetToken}" 
              style="display: inline-block; padding: 15px 35px; background: linear-gradient(45deg, #004d40, #00796b); color: white; font-size: 18px; font-weight: bold; border-radius: 50px; text-decoration: none; box-shadow: 0px 12px 25px rgba(0, 77, 64, 0.3); transition: all 0.6s ease; text-transform: uppercase;">
              Reset Password
           </a>
          <p style="font-size: 14px; color: #004d40; margin-top: 20px;">This link will be valid for 15 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email', error: error.toString() });
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Password reset email sent successfully' });
    });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});


forgotPasswordRoutes.get('/reset-password/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.redirect(`https://code-up-omega.vercel.app/reset-password?token=${token}`);
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
});

forgotPasswordRoutes.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

export default forgotPasswordRoutes;
