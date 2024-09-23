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

googleAuth.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://code-up-omega.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

googleAuth.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
    prompt: 'consent',
}));

googleAuth.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), async (req, res) => {
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  req.user.token = token;
  await req.user.save();
  res.redirect(`https://code-up-omega.vercel.app/user?token=${token}`);
});

export default googleAuth;
