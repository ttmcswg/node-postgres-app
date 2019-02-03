const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const pool = require('../db/pool');

passport.use(new LocalStrategy({ session: false },
  (username, password, done) =>{
    pool.query(`SELECT * FROM users WHERE user_name ='${username}'`, (error, results) => {
      if (error) {
        return done(error);
      }
      const user = results.rows[0];

      if (!user) {
        return done(null, false, { message: 'Wrong login or password.' });
      }
      return done(null, user);
    });
  })
);

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'kek'
}, (payload, done) => {
  pool.query(`SELECT * FROM users WHERE user_id=${payload.data.user_id}`, (error, results) => {
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

