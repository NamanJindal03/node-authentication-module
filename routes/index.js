const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');

router.get('/', passport.checkAuthenticatedUser, homeController.home);
router.use('/users', require('./users'))
module.exports = router;