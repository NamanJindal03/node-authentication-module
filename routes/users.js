const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.create);
//called when user attempts to sign in and we use an inbuilt function by passport to authenticate the user.
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/xyz'},
), userController.createSession)
router.get('/sign-out', userController.signOut);
router.get('/update-password', passport.checkAuthenticatedUser, userController.updatePassword);
router.post('/change-password', passport.checkAuthenticatedUser, userController.changePassword);

/* Routes of Google Oauth */
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'users/sign-in'}), userController.createSession)
module.exports = router;