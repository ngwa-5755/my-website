const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Ensure this path is correct
const jwt = require('jsonwebtoken');

const app = express();

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://ngwa5755:uXDmuBsGDMuW2EM1@cluster0.r0jzmjg.mongodb.net/mywebsite?retryWrites=true&w=majority&appName=Cluster0', 
  { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));

// Set the views directoty
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Sessions
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Authentication Middleware
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/auth/login');
}

// Routes
app.get('/', (req, res) => {
  res.render('index.html', { user: req.session.user });
});

app.get('/auth/login', (req, res) => {
  res.render('login.html');
});

// Include the forms router
const formsRouter = require('./routes/forms');
app.use('/forms', formsRouter);


app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    return res.redirect('/');
  }

  res.redirect('/auth/login');
});

app.get('/auth/register', (req, res) => {
  res.render('register.html');
});

app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, password: hashedPassword });

  await newUser.save();
  res.redirect('/auth/login');
});

app.get('/forms', ensureAuthenticated, (req, res) => {
  res.render('forms.html', { user: req.session.user });
});

app.get('/forms/self-assessment', ensureAuthenticated, (req, res) => {
  res.render('self-assessment.html', { user: req.session.user });
});

app.get('/forms/evaluation-schedule', ensureAuthenticated, (req, res) => {
  res.render('evaluation-schedule.html', { user: req.session.user });
});

app.get('/forms/facultyevaluation', ensureAuthenticated, (req, res) => {
  res.render('faculty-evaluation.html', { user: req.session.user });
});

app.get('/forms/peer-review', ensureAuthenticated, (req, res) => {
  res.render('peer-review.html', { user: req.session.user });
});

// Display Evaluation Schedules
app.get('/forms/evaluation-schedules.html', async (req, res) => {
  const schedules = await EvaluationSchedule.find();
  res.sendFile(path.join(__dirname, 'views', 'evaluation-schedules.html'));
});

// Display Faculty Evaluations
app.get('/forms/faculty-evaluations.html', async (req, res) => {
  const evaluations = await FacultyEvaluation.find();
  res.sendFile(path.join(__dirname, 'views', 'faculty-evaluations.html'));
});

// Display Peer Reviews
app.get('/forms/peer-reviews.html', async (req, res) => {
  const reviews = await PeerReview.find();
  res.sendFile(path.join(__dirname, 'views', 'peer-reviews.html'));
});

app.post('/forms/faculty-evaluation.html', async (req, res) => {
  const { facultyName, course, evaluationDate, evaluator, teachingEffectiveness, courseContent, engagement, comments } = req.body;
  const facultyEvaluation = new FacultyEvaluation({ facultyName, course, evaluationDate, evaluator, teachingEffectiveness, courseContent, engagement, comment>
  await facultyEvaluation.save();
  res.redirect('/faculty-evaluation.html');
});

app.post('/forms/peer-review.html', async (req, res) => {
  const { reviewerName, revieweeName, reviewDate, communication, teamwork, problemSolving, workQuality, comments } = req.body;
  const peerReview = new PeerReview({ reviewerName, revieweeName, reviewDate, communication, teamwork, problemSolving, workQuality, comments });
  await peerReview.save();
  res.redirect('/peer-review.html');
});

app.post('/forms/evaluation-schedule', async (req, res) => {
  const { evaluatorName, evaluationDate, comments } = req.body;
  const evaluationSchedule = new EvaluationSchedule({ evaluatorName, evaluationDate, comments });
  await evaluationSchedule.save();
  res.redirect('/evaluation-schedule.html');
});

// Handle form submissions
app.post('/forms/evaluation-schedule.html', async (req, res) => {
  const { evaluatorName, evaluationDate, comments } = req.body;
  const evaluationSchedule = new EvaluationSchedule({ evaluatorName, evaluationDate, comments });
  await evaluationSchedule.save();
  res.redirect('/evaluation-schedule.html');
});

app.post('/forms/faculty-evaluation.html', async (req, res) => {
  const { facultyName, course, evaluationDate, evaluator, teachingEffectiveness, courseContent, engagement, comments } = req.body;
  const facultyEvaluation = new FacultyEvaluation({ facultyName, course, evaluationDate, evaluator, teachingEffectiveness, courseContent, engagement, comment>
  await facultyEvaluation.save();
  res.redirect('/faculty-evaluation.html');
});

app.post('/forms/peer-review.html', async (req, res) => {
  const { reviewerName, revieweeName, reviewDate, communication, teamwork, problemSolving, workQuality, comments } = req.body;
  const peerReview = new PeerReview({ reviewerName, revieweeName, reviewDate, communication, teamwork, problemSolving, workQuality, comments });
  await peerReview.save();
  res.redirect('/peer-review.html');
});

app.post('/forms/self-assessment', ensureAuthenticated, (req, res) => {
  // Handle form submission logic here
  const { name, email, department, performance, goals, evidence } = req.body; 
  const selfAssessment = new selfAssessment({ name, email, department, performance, goals, evidence });
  res.redirect('/forms');
});

app.get('/resources', ensureAuthenticated, (req, res) => {
  res.render('resources.html', { user: req.session.user });
});

app.get('/help', ensureAuthenticated, (req, res) => {
  res.render('help.html', { user: req.session.user });
});

app.get('/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/auth/login'); // Redirect to login or home page
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
