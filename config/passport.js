const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const UserService = require('../services/userService');

const ls = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    return User.findOne({ email })
      .then(async user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        //compare password
        const same = await UserService.comparePassword(password, user.password);
        if (!same) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        return done(null, user, { message: 'Logged in successfully.' });
      })
      .catch(err => done(err));
  }
);

passport.use(ls);
