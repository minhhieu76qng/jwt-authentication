const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User.model');
const UserService = require('../services/userService');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Something is not right.',
        user
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        return res.status(400).json(err);
      }

      // generate jwt token
      const token = UserService.generateToken(user);

      return res.status(200).json({
        user: {
          _id: user._id,
          email: user.email
        },
        token
      });
    });
  })(req, res);
});

router.post('/register', async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    // check email
    const result = await User.findOne({ email });

    if (result) {
      // da ton tai email
      return res.status(409).json({
        error: {
          message: 'Email already exists.'
        },
        data: {
          email
        }
      });
    }

    // hashpassword
    const hashPw = await UserService.hashPassword(password);
    const user = new User({ email, name, password: hashPw });

    const retUser = await user.save();

    if (!retUser) {
      return res.status(500).json({
        error: { message: "Can't create new account!" }
      });
    }

    return res.status(201).json({
      data: {
        _id: retUser._id,
        email: retUser.email
      },
      message: 'Account is created!'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
