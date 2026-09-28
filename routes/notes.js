const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Check if user is logged in
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // Redirect to login if not authenticated
    res.redirect('/login');
}

// Show all notes
router.get('/notes', checkAuth, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.render('notes/index', { notes: notes, user: req.user });
    } catch (err) {
        console.log(err);
        res.render('notes/index', { notes: [], user: req.user, error: 'Something went wrong' });
    }
});

// Show new note form
router.get('/notes/new', checkAuth, (req, res) => {
    res.render('notes/new');
});

// Save new note
router.post('/notes', checkAuth, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.render('notes/new', { error: 'All fields are required' });
        }

        await Note.create({
            title: title,
            content: content,
            user: req.user._id
        });

        res.redirect('/notes');
    } catch (err) {
        console.log(err);
        res.render('notes/new', { error: 'Something went wrong' });
    }
});

// Show edit note form
router.get('/notes/:id/edit', checkAuth, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) {
            return res.redirect('/notes');
        }
        res.render('notes/edit', { note: note });
    } catch (err) {
        console.log(err);
        res.redirect('/notes');
    }
});

// Save note edit
router.post('/notes/:id', checkAuth, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.redirect('/notes');
        }

        await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title: title, content: content }
        );

        res.redirect('/notes');
    } catch (err) {
        console.log(err);
        res.redirect('/notes');
    }
});

// Delete note
router.post('/notes/:id/delete', checkAuth, async (req, res) => {
    try {
        await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        res.redirect('/notes');
    } catch (err) {
        console.log(err);
        res.redirect('/notes');
    }
});

module.exports = router;