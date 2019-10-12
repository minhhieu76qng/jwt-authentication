const express = require('express');
const router = express.Router();

router.use('/user', require('./userAPI'));

module.exports = router;
