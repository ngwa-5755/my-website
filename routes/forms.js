const express = require('express');
const router = express.Router();

// Authentication middleware
router.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
});

// Self-assessment form
router.get('/self-assessment', (req, res) => {
  res.render('forms/self-assessment');
});

// Annual evaluation form
router.get('/annual-evaluation', (req, res) => {
  res.render('forms/annual-evaluation');
});

module.exports = router;
