const authService = require('../services/authService');

exports.register = (req, res) => {
    const { username, email, password } = req.body;

    authService.checkUserExists(email)
        .then(user => {
            if (user) {
                res.status(400).json({ msg: 'User already exists' });
            } else {
                authService.registerUser(username, email, password)
                    .then(token => res.json({ message: 'Registered successfully', token }))
                    .catch(err => res.status(400).json({ msg: err.message }));
            }
        })
        .catch(err => res.status(400).json({ msg: err.message }));
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    authService.loginUser(email, password)
        .then(token => res.json({ message: 'Logged in successfully', token }))
        .catch(err => res.status(400).json({ msg: err.message }));
};

