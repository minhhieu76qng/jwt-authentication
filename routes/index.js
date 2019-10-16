const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.mdw');

router.use('/user', require('./userAPI'));

router.get('/me', auth, (req, res, next) => {
  const { _id, name, email, createdAt, updatedAt } = req.user;
  return res.status(200).json({
    data: {
      _id,
      name,
      email,
    }
  });
});

module.exports = router;
