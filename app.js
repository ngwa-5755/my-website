const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Ensure this path is correct

const app = express();
const PORT = 3000;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://ngwa5755:uXDmuBsGDMuW2EM1@cluster0.r0jzmjg.mongodb.net/mywebsite?retryWrites=true&w=majority&appName=Cluster0', 
  { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

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

app.post('/forms/self-assessment', ensureAuthenticated, (req, res) => {
  // Handle form submission logic here
  res.redirect('/forms');
});

app.get('/resources', ensureAuthenticated, (req, res) => {
  res.render('resources.html', { user: req.session.user });
});

app.get('/help', ensureAuthenticated, (req, res) => {
  res.render('help.html', { user: req.session.user });
});

app.get('/auth/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
