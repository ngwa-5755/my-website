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

// Evaluation schedule form
router.get('/evaluation-schedule', (req, res) => {
  res.render('forms/evaluation-schedule');
});

// Faculty evaluation form
router.get('/faculty-evaluation', (req, res) => {
  res.render('forms/faculty-evaluation');
});

// Peer review form
router.get('/peer-review', (req, res) => {
  res.render('forms/peer-review');
});

// Handle form submissions
router.post('/self-assessment', (req, res) => {
  // Handle self-assessment form submission
  res.redirect('/forms/self-assessment');
});

router.post('/evaluation-schedule', async (req, res) => {
  const { evaluatorName, evaluationDate, comments } = req.body;
  const evaluationSchedule = new EvaluationSchedule({ evaluatorName, evaluationDate, comments });
  await evaluationSchedule.save();
  res.redirect('/forms/evaluation-schedule');
});

router.post('/faculty-evaluation', async (req, res) => {
  const { facultyName, course, evaluationDate, evaluator, comments } = req.body;
  const facultyEvaluation = new FacultyEvaluation({ facultyName, course, evaluationDate, evaluator, comments });
  await facultyEvaluation.save();
  res.redirect('/forms/faculty-evaluation');
});
router.post('/peer-review', async (req, res) => {
  const { reviewerName, revieweeName, reviewDate, comments } = req.body;
  const peerReview = new PeerReview({ reviewerName, revieweeName, reviewDate, comments });
  await peerReview.save();
  res.redirect('/forms/peer-review');
});

module.exports = router;
