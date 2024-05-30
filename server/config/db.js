const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('MongoDB connected...');
            resolve();
        })
        .catch((err) => {
            console.error(err.message);
            reject(err);
        });
    });
};

module.exports = connectDB;
