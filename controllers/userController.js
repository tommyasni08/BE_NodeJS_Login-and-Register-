const { user } = require('../models');
const jwt = require('jsonwebtoken');

class UserController {

  async signin(req, res) {
    try {
      let body = {
        id: req.user.id,
        email: req.user.email
      };

      let token = jwt.sign({
        user: body
      }, 'secret_password');

      return res.status(200).json({
        message: "Signin success!",
        token: token
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        errors: e
      })
    }
  }

  async failed(req, res) {
    try {
      return res.status(500).json({
        message: "Internal Server Error"
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        errors: e
      });
    }
  }

}

module.exports = new UserController;
