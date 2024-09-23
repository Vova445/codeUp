import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { User } from '../../models/userModel.js';
import jwt from 'jsonwebtoken';

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

googleAuth.get('/auth/google', (req, res, next) => {
    const redirectUrl = 'https://code-up-omega.vercel.app/user';
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: redirectUrl 
    })(req, res, next);
});

googleAuth.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), async (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log('Generated Token:', token);
    req.user.token = token;
    await req.user.save();
    res.cookie('authToken', token, { httpOnly: true, secure: true });
    res.redirect(req.query.state);
});

export default googleAuth;
