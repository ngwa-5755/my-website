module.exports.ensureAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    } else {
      res.redirect('/auth/login');
    }
};
  