// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, loginUser } = require('../controllers/user.controller');

router.post('/user/create', createUser);

router.get('/users', getAllUsers);

router.post('/login', loginUser);

module.exports = router;
