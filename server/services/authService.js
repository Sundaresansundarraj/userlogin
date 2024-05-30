const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.checkUserExists = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email })
            .then(user => {
                if (user) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            })
            .catch(err => reject(err));
    });
};

exports.registerUser = (username, email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = new User({ username, email, password });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = { user: { id: user.id } };

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        } catch (err) {
            reject(err);
        }
    });
};

exports.loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    reject(new Error('Invalid credentials'));
                } else {
                    bcrypt.compare(password, user.password)
                        .then(isMatch => {
                            if (!isMatch) {
                                reject(new Error('Invalid credentials'));
                            } else {
                                const payload = { user: { id: user.id } };
                                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
                                    if (err) reject(err);
                                    resolve(token);
                                });
                            }
                        })
                        .catch(err => reject(err));
                }
            })
            .catch(err => reject(err));
    });
};
