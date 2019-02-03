const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');

const pool = require('../db/pool');
const { jwtSecret } = require('../config');

passport.use(new LocalStrategy({ session: false },
  (username, password, done) =>{
    pool.query(`SELECT * FROM users LEFT JOIN user_roles on users.user_id = user_roles.user_id WHERE users.user_name ='${username}'`, (error, results) => {
      if (error) {
        return done(error);
      }
      console.log('res', results)
      const user = results.rows[0];

      bcrypt.compare(password, user.user_password, (err, isValid) => {
        if (err) {
          return done(err);
        }
        if (!isValid) {
          return done(null, false, { message: 'Wrong login or password.' });
        }
        return done(null, user);
      });
    });
  })
);

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
}, (payload, done) => {
  pool.query(`SELECT * FROM users LEFT JOIN user_roles on users.user_id = user_roles.user_id WHERE users.user_id=${payload.data.user_id}`, (error, results) => {
    if (error) {
      return done(error);
    }

    const user = results.rows[0];

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
})
);

