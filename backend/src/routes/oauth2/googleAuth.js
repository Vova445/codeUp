import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { User } from '../../models/userModel.js';

dotenv.config();
const googleAuth = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
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
  passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
  
  googleAuth.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  googleAuth.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  }));
  
  export default googleAuth;  