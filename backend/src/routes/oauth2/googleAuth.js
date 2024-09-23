import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import session from 'express-session'; 
import { User } from '../../models/userModel.js';

dotenv.config();
const googleAuth = express.Router();

googleAuth.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' } 
}));

googleAuth.use(passport.initialize());
googleAuth.use(passport.session());

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

googleAuth.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

googleAuth.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/api/login' }), (req, res) => {
    res.redirect('https://code-up-omega.vercel.app/user');
});


export default googleAuth;
