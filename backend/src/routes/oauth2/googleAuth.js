import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { User } from '../../models/userModel.js';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

dotenv.config();
const googleAuth = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://code-up-t9gxb.ondigitalocean.app/api/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({ googleId: profile.id, name: profile.displayName, email: profile.emails[0].value });
        await user.save();
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
});

googleAuth.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

googleAuth.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), async (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log('Generated Token:', token);
    req.user.token = token;
    await req.user.save();

    res.setHeader('Set-Cookie', cookie.serialize('authToken', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, 
        path: '/'
    }));
    res.redirect('https://code-up-omega.vercel.app/user');
});

export default googleAuth;
