const express = require('express');
const router = express.Router();

// Authentication middleware
router.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
});

router.get('/', (req, res) => {
  res.render('resources');
});

module.exports = router;
