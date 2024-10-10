const express = require('express');
const Event = require('../models/event.model');
const { createEvent, getEvents } = require('../controllers/event.controller');
const { verifyAdmin, verifyToken } = require('../config/jwtToken');
const router = express.Router();


router.post('/events', verifyToken, verifyAdmin, createEvent);

router.get('/events', verifyToken, verifyAdmin, getEvents);

module.exports = router;
