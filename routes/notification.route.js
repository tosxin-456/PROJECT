const express = require('express');
const Notification = require('../models/notification.model');
const { create_notification, getNotification } = require('../controllers/notification.cotroller');
const { verifyToken } = require('../config/jwtToken');
const router = express.Router();

// POST - Create a new notification
router.post('/notifications', verifyToken, create_notification);

// GET - Fetch all notifications
router.get('/notifications', verifyToken, getNotification);

module.exports = router;
