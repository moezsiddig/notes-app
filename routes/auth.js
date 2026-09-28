const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Show register page
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle register form
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.render('register', { error: 'All fields are required' });
        }

        if (username.length < 3) {
            return res.render('register', { error: 'Username must be at least 3 characters' });
        }

        if (password.length < 6) {
            return res.render('register', { error: 'Password must be at least 6 characters' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('register', { error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ username, password: hashedPassword });

        res.redirect('/login');
    } catch (err) {
        console.log(err);
        res.render('register', { error: 'Something went wrong' });
    }
});

// Show login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle login form
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.render('login', { error: info.message });
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect('/notes');
        });
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/login');
    });
});

module.exports = router;