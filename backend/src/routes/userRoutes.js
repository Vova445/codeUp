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
// import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import crypto from 'crypto'

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
         user = await User.findOne({ email: profile.emails[0].value });
         if (!user) {
             user = new User({ googleId: profile.id, name: profile.displayName, email: profile.emails[0].value });
             console.log("New user created:", user);
         } else {
             console.log("Existing user found by email:", user);
         }
     } else {
         console.log("Existing user found by Google ID:", user);
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


// passport.use(new FacebookStrategy({
//    // clientID: process.env.FACEBOOK_APP_ID,
//    // clientSecret: process.env.FACEBOOK_APP_SECRET,
//    callbackURL: "https://code-up-t9gxb.ondigitalocean.app/api/auth/facebook/callback",
//    profileFields: ['id', 'displayName', 'emails']
// }, async (accessToken, refreshToken, profile, done) => {
//    try {
//        let user = await User.findOne({ facebookId: profile.id });
//        if (!user) {
//            user = new User({
//                facebookId: profile.id,
//                name: profile.displayName,
//                email: profile.emails[0].value
//            });
//            console.log("New user created:", user);
//        } else {
//            console.log("Existing user found:", user);
//        }

//        const token = generateToken(user._id, process.env.JWT_SECRET, '24h');
//        const refreshToken = generateToken(user._id, process.env.JWT_REFRESH_SECRET, '30d');
//        user.token = token;
//        user.refreshToken = refreshToken;
//        await user.save();

//        done(null, user);
//    } catch (err) {
//        done(err, null);
//    }
// }));

// userRoutes.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));



// userRoutes.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
//    const token = req.user.token;
//    res.redirect(`https://code-up-omega.vercel.app/loading?token=${token}`);
// });


passport.use(new GitHubStrategy({
   clientID: process.env.GITHUB_CLIENT_ID,
   clientSecret: process.env.GITHUB_CLIENT_SECRET,
   callbackURL: "https://code-up-t9gxb.ondigitalocean.app/api/auth/github/callback",
   session: false
}, async (accessToken, refreshToken, profile, done) => {
   try {
      let user = await User.findOne({ githubId: profile.id });
      let email = null;
      if (profile.emails && profile.emails.length > 0) {
         email = profile.emails[0].value;
     } else {
      const response = await fetch(`https://api.github.com/user/emails`, {
         headers: {
             Authorization: `Bearer ${accessToken}`
         }
     });
     const emails = await response.json();
     email = emails[0]?.email;
   }
   if (!user) {
      let email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

      if (!email) {
          const response = await fetch(`https://api.github.com/user/emails`, {
              headers: { Authorization: `Bearer ${accessToken}` }
          });
          const emails = await response.json();
          email = emails[0]?.email;
      }

      user = await User.findOne({ email });
      if (!user) {
          user = new User({
              githubId: profile.id,
              name: profile.displayName || profile.username,
              email: email
          });
          console.log("New user created:", user);
      } else {
          console.log("Existing user found by email:", user);
      }
  } else {
      console.log("Existing user found by GitHub ID:", user);
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


userRoutes.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));


userRoutes.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
   const token = req.user.token;
   res.redirect(`https://code-up-omega.vercel.app/loading?token=${token}`);
});




passport.use(new LinkedInStrategy({
   clientID: process.env.LINKEDIN_CLIENT_ID,
   clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
   callbackURL: "https://code-up-t9gxb.ondigitalocean.app/api/auth/linkedin/callback",
   scope: ['r_liteprofile', 'r_emailaddress'],
   state: true 
}, async (accessToken, refreshToken, profile, done) => {
   try {
       let user = await User.findOne({ linkedinId: profile.id });
       if (!user) {
           user = new User({
               linkedinId: profile.id,
               name: profile.displayName,
               email: profile.emails[0].value,
           });
           console.log("New user created:", user);
       } else {
           console.log("Existing user found:", user);
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



userRoutes.get('/auth/linkedin', (req, res, next) => {
    const state = crypto.randomBytes(16).toString('hex');
    req.session.oauthState = state; 
    passport.authenticate('linkedin', { state: state })(req, res, next);
});




userRoutes.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
    const token = req.user.token;
    res.redirect(`https://code-up-omega.vercel.app/loading?token=${token}`);
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

      const { name, email, phoneNumber, password } = req.body;

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
      if (password) {
         user.password = password;
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
