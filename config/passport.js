const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User.model');
const UserService = require('../services/userService');

const { SECRET_KEY } = process.env;

const ls = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
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

const jwts = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
  },
  async function(jwtPayload, done) {
    try {
      const user = await User.findOne({ _id: jwtPayload._id });

      if (!user) return done(null, false);

      return done(null, user);
    } catch (err) {
      next(err);
    }
  }
);

passport.use(ls);
passport.use(jwts);
