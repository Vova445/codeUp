import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userSchema, loginSchema } from '../validator/validation.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { User } from '../models/userModel.js';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userRoutes = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

function deleteFile(filePath) {
    const fullPath = path.join(__dirname, '../../uploads', filePath);
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully:', filePath);
        }
    });
}

userRoutes.post('/register', validateRequest(userSchema), async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('Registering user:', { name, email });
        const newUser = new User({ name, email, password });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        newUser.token = token;
        await newUser.save();

        console.log('User registered successfully:', { userId: newUser._id, token });
        res.status(201).json({ message: 'User registered successfully!', token });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

userRoutes.post('/login', validateRequest(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Attempting to login user with email:', email);
        let user = (await User.findOne({ email })) || (await User.findOne({ phoneNumber: email }));

        if (!user) {
            console.warn('User not found:', email);
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.warn('Invalid credentials for user:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.token = token;
        user.lastLogin = new Date();
        await user.save();

        console.log('User logged in successfully:', { userId: user._id, token });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
});

userRoutes.post('/update-profile', upload.single('avatar'), async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Updating profile with token:', token);

    if (!token) {
        console.warn('No token provided for profile update');
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            console.warn('User not found for profile update:', decoded.userId);
            return res.status(404).json({ message: 'User not found' });
        }

        const { name, email, phoneNumber } = req.body;

        if (name) user.name = name;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (req.file) {
            if (user.avatar) {
                deleteFile(user.avatar.split('/uploads/')[1]);
            }

            user.avatar = `uploads/${req.file.filename}`;
        }

        await user.save();

        console.log('Profile updated successfully:', { userId: user._id, avatar: user.avatar });
        res.status(200).json({ message: 'Profile updated successfully!', avatar: user.avatar });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(401).json({ message: 'Invalid token' });
    }
});

userRoutes.get('/user-profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Fetching user profile with token:', token);

    if (!token) {
        console.warn('No token provided for fetching user profile');
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            console.warn('User not found for fetching profile:', decoded.userId);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User profile fetched successfully:', { userId: user._id });
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(401).json({ message: 'Invalid token' });
    }
});

userRoutes.get('/check-auth', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Checking authentication with token:', token);

    if (!token) {
        console.log('No token provided for authentication check');
        return res.json({ isAuthenticated: false });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token is valid');
        return res.json({ isAuthenticated: true });
    } catch (err) {
        console.error('Invalid token:', err);
        return res.json({ isAuthenticated: false });
    }
});

export default userRoutes;
