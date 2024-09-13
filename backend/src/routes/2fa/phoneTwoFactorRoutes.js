import express from 'express';
import twilio from 'twilio';
import { User } from '../../models/userModel.js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const phoneTwoFactorRoutes = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

phoneTwoFactorRoutes.post('/send-2fa-sms', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  const parsedNumber = parsePhoneNumberFromString(phoneNumber);
  if (!parsedNumber || !parsedNumber.isValid()) {
    return res.status(400).json({ message: 'Invalid phone number' });
  }

  const formattedNumber = parsedNumber.format('E.164');

  try {
    const code = Math.floor(100000 + Math.random() * 900000);
    
    await client.messages.create({
      body: `Your 2FA code is: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedNumber,
    });
    
    const user = await User.findOne({ phoneNumber: formattedNumber });
    if (user) {
      user.twoFASecret = code.toString();
      user.twoFAMethod = 'phone';
      await user.save();
    }

    res.status(200).json({ message: '2FA code sent successfully' });
  } catch (error) {
    console.error('Error sending SMS:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      moreInfo: error.moreInfo,
    });
    res.status(500).json({ message: 'Error sending SMS' });
  }
});

export default phoneTwoFactorRoutes;
