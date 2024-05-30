const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

connectDB()
    .then(() => {
        app.use(express.json({ extended: false }));

        app.use('/api/auth', authRoutes);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });
