require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/connectionDB');

const app = express();
connectDB();

// Parse form data from POST requests
app.use(express.urlencoded({ extended: true }));

// Configure session for Passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect passport config
require('./passportConfig');

// Serve static files (CSS, images) from /public
app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);
const noteRoutes = require('./routes/notes');
app.use('/', noteRoutes);

// Home page
app.get('/', (req, res) => {
    res.redirect('/notes');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});

