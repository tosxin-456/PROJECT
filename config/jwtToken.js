require('dotenv').config();
const userModel = require('../src/Models/userModel');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await userModel.findById(decoded.userId).select('-password');
            if (!req.user) {
                return res.status(404).json({ message: 'User not found' });
            }
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    } else {
        res.status(401).json({ message: 'You are not authorized, token missing' });
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.Role === 'Admin') {
        next();
    } else {
        res.status(401).json({ message: 'Only authorized admins can access this route' });
    }
};

const verifyStudent = (req, res, next) => {
    if (req.user && req.user.Role === 'Student') {
        next();
    } else {
        res.status(401).json({ message: 'Only authorized students can access this route' });
    }
};

module.exports = { verifyToken, verifyAdmin, verifyStudent };
