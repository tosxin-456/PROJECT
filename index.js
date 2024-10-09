const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route');
const cors = require("cors")
require('dotenv').config();

const app = express();

app.use(cors())
// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Database connection error: ', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Db()