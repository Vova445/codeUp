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
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } 
});

function deleteFile(filePath) {
    const fullPath = path.join(__dirname, '../../uploads', filePath);
    console.log('Deleting file:', fullPath);
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully:', filePath);
        }
    });
}



const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

userRoutes.post('/register', validateRequest(userSchema), async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        newUser.token = token;
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!', token });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

userRoutes.post('/login', validateRequest(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email }) || await User.findOne({ phoneNumber: email });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.token = token;
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
});

userRoutes.post('/update-profile', authenticateToken, upload.single('avatar'), async (req, res) => {
    try {
        console.log('Updating profile for user:', req.user.userId);
        console.log('Request body:', req.body);
        console.log('Uploaded file:', req.file);
        const user = await User.findById(req.user.userId);
        if (!user) {
            console.error('User not found');
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
            user.avatar = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
        }

        await user.save();
        console.log('Profile updated successfully for user:', req.user.userId);
        res.status(200).json({ message: 'Profile updated successfully!', avatar: user.avatar });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ message: 'Error updating profile', error: err.message });
    }
});



userRoutes.get('/user-profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user profile', error: err.message });
    }
});

userRoutes.get('/check-auth', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.json({ isAuthenticated: false });

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) return res.json({ isAuthenticated: false });
        res.json({ isAuthenticated: true });
    });
});

export default userRoutes;
