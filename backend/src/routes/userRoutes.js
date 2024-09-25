import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userSchema, loginSchema } from '../validator/validation.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { User } from '../models/userModel.js';
import dotenv from 'dotenv';
import multer from 'multer';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

dotenv.config();

const userRoutes = express.Router();

const generateToken = (userId, secret, expiresIn) => {
   return jwt.sign({ userId }, secret, { expiresIn });
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

passport.use(new GoogleStrategy({
   clientID: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
   callbackURL: "https://code-up-t9gxb.ondigitalocean.app/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
   try {
       let user = await User.findOne({ googleId: profile.id });
       if (!user) {
           user = new User({ googleId: profile.id, name: profile.displayName, email: profile.emails[0].value, avatar: profile.photos[0].value });
           console.log("New user created:", user);
       } else {
           console.log("Existing user found:", user);
           if (!user.avatar) {
            user.avatar = profile.photos[0].value;
            user.avatarContentType = 'image/jpeg';
        }
       }

       const token = generateToken(user._id, process.env.JWT_SECRET, '24h');
       const refreshToken = generateToken(user._id, process.env.JWT_REFRESH_SECRET, '30d');
       user.token = token;
       user.refreshToken = refreshToken;
       await user.save();

       done(null, user);
   } catch (err) {
       done(err, null);
   }
}));


passport.serializeUser((user, done) => {
   done(null, user._id);
});


passport.deserializeUser(async (id, done) => {
   try {
       const user = await User.findById(id);
       done(null, user);
   } catch (err) {
       done(err, null);
   }
});


userRoutes.post('/register', validateRequest(userSchema), async (req, res) => {
   try {
       const { name, email, password } = req.body;
       const newUser = new User({ name, email, password });
       await newUser.save();

       const token = generateToken(newUser._id, process.env.JWT_SECRET, '24h');
       const refreshToken = generateToken(newUser._id, process.env.JWT_REFRESH_SECRET, '30d');
       newUser.token = token;
       newUser.refreshToken = refreshToken;
       await newUser.save();

       res.status(201).json({ message: 'User registered successfully!', token, refreshToken });
   } catch (err) {
       console.error('Error registering user:', err);
       res.status(500).json({ message: 'Error registering user', error: err.message });
   }
});

userRoutes.post('/login', validateRequest(loginSchema), async (req, res) => {
   try {
     const { email, password } = req.body;
     let user = (await User.findOne({ email })) || (await User.findOne({ phoneNumber: email }));
 
     if (!user) {
       return res.status(404).json({ message: 'User not found' });
     }
 
     const isMatch = await bcrypt.compare(password, user.password);
 
     if (!isMatch) {
       return res.status(400).json({ message: 'Invalid credentials' });
     }
 
     const token = generateToken(user._id, process.env.JWT_SECRET, '24h');
     const refreshToken = generateToken(user._id, process.env.JWT_REFRESH_SECRET, '30d');
     user.token = token;
     user.refreshToken = refreshToken;
     user.lastLogin = new Date();
     await user.save();
 
     if (user.isTwoFAEnabled) {
       return res.status(200).json({
         message: 'Two-factor authentication required',
         token,
         refreshToken,
         user: {
           isTwoFAEnabled: user.isTwoFAEnabled,
           twoFAMethod: user.twoFAMethod,
         },
       });
     } else {
       return res.status(200).json({
         message: 'Login successful',
         token,
         refreshToken,
         user: {
           isTwoFAEnabled: user.isTwoFAEnabled,
           twoFAMethod: user.twoFAMethod,
         },
       });
     }
   } catch (err) {
     console.error('Error logging in:', err);
     res.status(500).json({ message: 'Error logging in', error: err.message });
   }
});
 
userRoutes.get('/auth/google', passport.authenticate('google', {
   scope: ['profile', 'email'],
}));

userRoutes.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
   const token = req.user.token;
   res.redirect(`https://code-up-omega.vercel.app/loading?token=${token}`);
});


userRoutes.post('/update-profile', upload.single('avatar'), async (req, res) => {
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

      const { name, email, phoneNumber } = req.body;

      if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;

      if (phoneNumber !== undefined) {
         const cleanedPhoneNumber = phoneNumber.replace(/\s+/g, ''); 
         if (cleanedPhoneNumber === '') {
            user.phoneNumber = undefined; 
         } else {
            user.phoneNumber = cleanedPhoneNumber;
         }
      }

      if (req.file) {
         user.avatar = req.file.buffer;
         user.avatarContentType = req.file.mimetype;
      }

      await user.save();

      res.status(200).json({ message: 'Profile updated successfully!', avatar: user.avatar });
   } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
   }
});

userRoutes.get('/user-profile', async (req, res) => {
   const token = req.headers.authorization?.split(' ')[1];

   if (!token) {
      return res.status(401).json({ message: 'No token provided' });
   }
   console.log('User profile request received:', req.user);
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }
      const avatarBase64 = user.avatar
         ? `data:${user.avatarContentType};base64,${user.avatar.toString('base64')}`
         : '';

      res.status(200).json({ ...user.toObject(), avatar: avatarBase64 });
   } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
   }
});

userRoutes.get('/check-auth', (req, res) => {
   const token = req.headers.authorization?.split(' ')[1];

   if (!token) {
      return res.json({ isAuthenticated: false });
   }

   try {
      jwt.verify(token, process.env.JWT_SECRET);
      return res.json({ isAuthenticated: true });
   } catch (err) {
      return res.json({ isAuthenticated: false });
   }
});

userRoutes.post('/refresh-token', async (req, res) => {
   try {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.status(400).json({ message: 'No refresh token provided' });

      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
         if (err) return res.status(403).json({ message: 'Invalid refresh token' });

         const token = generateToken(decoded.userId, process.env.JWT_SECRET, '5m');
         res.status(200).json({ accessToken: token });
      });
   } catch (err) {
      console.error('Error refreshing token:', err);
      res.status(500).json({ message: 'Error refreshing token', error: err.message });
   }
});



userRoutes.post('/logout', async (req, res) => {
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
 
     user.tokenEmail = null;
     await user.save();
 
     res.status(200).json({ message: 'Logged out successfully' });
   } catch (err) {
     res.status(401).json({ message: 'Invalid token' });
   }
 });

export default userRoutes;
