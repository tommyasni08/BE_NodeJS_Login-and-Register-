const { check, validationResult, matchedData, sanitize } = require('express-validator');

const signup = [
  check('email', 'email field must be an email address').normalizeEmail().isEmail(),
  check('password', 'password file must have 8 to 32 characters').isString().isLength({ min: 8, max: 32 }),
  check('passwordConfirmation', 'passwordConfirmation field must have the same value as the password field').exists()
    .custom((value, { req }) => value === req.body.password),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.mapped()
      });
    }

    next();
  }
]

const signin = [
  check('email', 'email field must be an email address').normalizeEmail().isEmail(),
  check('password', 'password file must have 8 to 32 characters').isString().isLength({ min: 8, max: 32 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.mapped()
      });
    }

    next();
  }
]

module.exports = { signup, signin }
