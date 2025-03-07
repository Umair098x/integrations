const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { RunQuery, RunTransactionQuery } = require("../services");
const { myDb } = require("../connection");
require("dotenv").config();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:30007/auth/google/redirect",
//       passReqToCallback: false,
//     },
//     (accessToken, refreshToken, params, profile, cb) => {
//       const tokenExpiry = params.expires_in;
//       console.log({ accessToken, refreshToken, tokenExpiry });

//       const query = `
//         INSERT INTO User_Applications (user_id, app_id, access_token, refresh_token, token_expiry)
//         VALUES (?, ?, ?, ?, ?)
//       `;
//       const values = [
//         "67c963fff8290e692c4805aa",
//         1,
//         accessToken,
//         refreshToken,
//         tokenExpiry,
//       ];

//       myDb.query(query, values, (err, results) => {
//         if (err) {
//           console.error("Error saving user to DB:", err);
//           return cb(err);
//         }
//         // Attach tokens to the profile for use later in your app.
//         profile.accessToken = accessToken;
//         profile.refreshToken = refreshToken;
//         profile.tokenExpiry = tokenExpiry;
//         return cb(null, profile);
//       });
//     }
//   )
// );

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:30007/auth/google/redirect",
      passReqToCallback: true, // Enable access to the req object
    },
    (req, accessToken, refreshToken, params, profile, cb) => {
      // Retrieve and parse the state parameter from the query string
      const { user_id, app_id } = JSON.parse(req.query.state || "{}");
      console.log({ user_id, app_id });

      // Use these values in your database query
      const query = `
        INSERT INTO User_Applications (user_id, app_id, access_token, refresh_token, token_expiry)
        VALUES (?, ?, ?, ?, ?)
      `;
      const values = [
        user_id,
        app_id,
        accessToken,
        refreshToken,
        params.expires_in,
      ];

      myDb.query(query, values, (err, results) => {
        if (err) {
          console.error("Error saving user to DB:", err);
          return cb(err);
        }
        // Attach tokens to the profile for later use
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;
        profile.tokenExpiry = params.expires_in;
        return cb(null, profile);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
