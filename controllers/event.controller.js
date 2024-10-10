const Event = require("../models/event.modal");

exports.createEvent = async (req, res) => {
    const { eventName, date, description } = req.body;
    const admin = req.user._id
    if ( !eventName || !date || !description) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newEvent = new Event({ admin, eventName, date, description });
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully!', event: newEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('admin', 'firstName lastName');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}