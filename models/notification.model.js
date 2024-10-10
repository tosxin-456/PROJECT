const mongoose = require('mongoose');
const User = require('./user.model'); // Assuming you have a User model

const notificationSchema = new mongoose.Schema({
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Fixed 'data' to 'date'
    email: { type: String, required: true }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
