exports.create_notification = async (req, res) => {
    const { message } = req.body;
    const admin = req.user._id
    const email = req.user.email
    if (!message || !email) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newNotification = new Notification({ admin, message, email });
        await newNotification.save();
        res.status(201).json({ message: 'Notification created successfully!', notification: newNotification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getNotification = async (req, res) => {
    try {
        const notifications = await Notification.find().populate('admin', 'firstName lastName');
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}