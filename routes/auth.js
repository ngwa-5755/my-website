const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Register page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register handler
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashedPassword });
  res.redirect('/auth/login');
});

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Login handler
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.redirect('/auth/login');
  }
});

// Sign out route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Unable to sign out');
        }
        res.clearCookie('connect.sid'); // Replace 'connect.sid' with your session cookie name if different
        res.redirect('/'); // Redirect to the home page or login page
    });
});

module.exports = router;
