import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User } from '../../models/userModel.js';

const emailTwoFactorRoutes = express.Router();

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

emailTwoFactorRoutes.post('/send-2fa-email', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Authorization Token:', token);

  if (!token) { 
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const twoFACode = Math.floor(100000 + Math.random() * 900000);
    user.twoFACode = twoFACode;
    user.twoFAMethod = 'email';
    await user.save();

    const confirmationToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const apiUrl = process.env.VITE_API_URL.trim().replace(/\/+$/, '');
    console.log('API URL:', apiUrl);
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
        subject: 'Your Two-Factor Authentication Code',
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
            <h2 style="color: #00796b; font-size: 30px; margin-bottom: 20px; animation: slideInFromTop 1s ease-out;">🔐 Two-Factor Authentication</h2>
            <p style="font-size: 18px; color: #004d40; margin-bottom: 20px; animation: fadeInUp 1s ease-out;">To ensure the security of your account, please verify your email address by clicking the button below:</p>
           <a href="${apiUrl}/api/verify-2fa/${confirmationToken}" 
               style="display: inline-block; padding: 15px 35px; background: linear-gradient(45deg, #004d40, #00796b); color: white; font-size: 18px; font-weight: bold; border-radius: 50px; text-decoration: none; box-shadow: 0px 12px 25px rgba(0, 77, 64, 0.3); transition: all 0.6s ease; text-transform: uppercase;">
               Verify Email
            </a>
            <p style="font-size: 14px; color: #004d40; margin-top: 20px;">This link will be valid for 15 minutes. If you did not request this, please ignore this email.</p>
            <div style="margin-top: 40px; padding: 20px; background: #ffffff; border-radius: 10px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);">
              <h3 style="color: #00796b; font-size: 22px;">Need Assistance?</h3>
              <p style="font-size: 16px; color: #004d40;">For support, reach out to us at <a href="mailto:mycodup@gmail.com" style="color: #004d40; text-decoration: underline;">mycodup@gmail.com</a>.</p>
            </div>
          </div>
        `
      };
      
      
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: 'Error sending email', error: error.toString() });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: '2FA email sent successfully' });
      });
    } catch (err) {
      console.error('Token verification error:', err);
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

      res.redirect('https://code-up-omega.vercel.app/twoFactorAuth/loading');
    } catch (error) {
      res.status(400).send('Invalid or expired token');
    }
  });
  

export default emailTwoFactorRoutes;
