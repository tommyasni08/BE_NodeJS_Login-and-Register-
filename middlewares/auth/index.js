const path = require('path');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { user } = require('../../models');
const bcrypt = require('bcrypt');

passport.use(
  'signup',
  new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        let userCreated = await user.create({
          email: email,
          password: password
        });

        return done(null, userCreated, { message: "Signup success!" });
      } catch (e) {
        return done(e, false, { message: "Can't signup!" })
      }
    }
  )
);

passport.use(
  'signin',
  new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        let userLogin = await user.findOne({
          where: {
            email: email
          }
        });

        if (!userLogin) {
          return done(null, false, { message: "User isn't found!" })
        }

        let validate = await bcrypt.compare(password, userLogin.password);

        if (!validate) {
          return done(null, false, { message: "Wrong password!" })
        }

        return done(null, userLogin, { message: "Signin success!" })
      } catch (e) {
        return done(e, false, { message: "Can't signin!" })
      }
    }
  )
)

passport.use(
  'google',
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let userLogin = await user.findOne({
        where: {
          email: profile.emails[0].value
        }
      });

      if (!userLogin) {
        userLogin = await user.create({
          email: profile.emails[0].value,
          password: "this is password for google!"
        });
      }

      return done(null, userLogin);
    } catch (e) {
      return done(null, false);
    }
  }
));

// passport.use(
//   'facebook',
//   new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//     profileFields: ['id', 'displayName', 'photos', 'email']
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let userLogin = await user.findOne({
//         where: {
//           email: profile.emails[0].value
//         }
//       });

//       if (!userLogin) {
//         userLogin = await user.create({
//           email: profile.emails[0].value,
//           password: "this is password for facebook!"
//         });
//       }

//       return done(null, userLogin);
//     } catch (e) {
//       return done(null, false);
//     }
//   }
// ));

// passport.use(
//   'twitter',
//   new TwitterStrategy({
//     consumerKey: process.env.TWITTER_CONSUMER_KEY,
//     consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//     callbackURL: process.env.TWITTER_CALLBACK_URL,
//     userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
//   },
//   async function(token, tokenSecret, profile, done) {
//     try {
//       let userLogin = await user.findOne({
//         where: {
//           email: profile.emails[0].value,
//         }
//       });

//       if (!userLogin) {
//         userLogin = await user.create({
//           email: profile.emails[0].value,
//           password: "this is password for twitter!"
//         });
//       }

//       return done(null, userLogin);
//     } catch (e) {
//       return done(null, false);
//     }
//   }
// ));

let signup = async (req, res, next) => {
  passport.authenticate('signup',
    { session: false },
    async (err, user, info) => {
      if (err) {
        return res.status(401).json({
          message: info.message,
          errors: err
        })
      }

      if (!user) {
        return res.status(401).json({
          message: info.message
        })
      }

      req.user = user;

      next();
    }
  )(req, res, next);
}

let signin = async (req, res, next) => {
  passport.authenticate('signin',
    { session: false },
    async (err, user, info) => {
      if (err) {
        return res.status(401).json({
          message: info.message,
          errors: err
        })
      }

      if (!user) {
        return res.status(401).json({
          message: info.message
        })
      }

      req.user = user;

      next();
    }
  )(req, res, next);
}

module.exports = { signup, signin };
