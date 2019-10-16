const passport = require('passport');
const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        error: {
          message: 'No token or token has expired.'
        }
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  auth
};
