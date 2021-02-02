const express = require('express');
const passport = require('passport');
const auth = require('../middlewares/auth');
const UserController = require('../controllers/userController');
const userValidator = require('../middlewares/validators/userValidator');

const router = express.Router();

router.post('/signup', [userValidator.signup, auth.signup], UserController.signin);
router.post('/signin', [userValidator.signin, auth.signin], UserController.signin);
router.get('/failed', UserController.failed);
router.get('/auth/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/failed' }), UserController.signin);
// router.get('/auth/facebook', passport.authenticate('facebook', { session: false }));
// router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false, failureRedirect: '/failed' }), UserController.signin);
// router.get('/auth/twitter', passport.authenticate('twitter', { session: false }));
// router.get('/auth/twitter/callback', passport.authenticate('twitter', { session: false, failureRedirect: '/failed' }), UserController.signin);

module.exports = router;
