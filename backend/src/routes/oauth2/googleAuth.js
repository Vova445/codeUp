import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { User } from '../../models/userModel.js';

dotenv.config();
const googleAuth = express.Router();

googleAuth.use(cookieParser());

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
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.token = token; 
        await user.save(); 

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

googleAuth.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), async (req, res) => {
    try {
        console.log('User authenticated:', req.user);
        const token = req.user.token;
        console.log('Token to be stored in cookie:', token);

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'None',
        });
        console.log('Cookie set:', req.cookies);

        res.redirect('https://code-up-omega.vercel.app/user');
    } catch (err) {
        if (err.code === 11000) {
            const message = encodeURIComponent('E11000 duplicate key error: email already exists');
            res.redirect(`https://code-up-omega.vercel.app?alert=${message}`);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});



export default googleAuth;
